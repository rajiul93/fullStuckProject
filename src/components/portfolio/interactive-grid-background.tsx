'use client';

import { useEffect, useRef, type CSSProperties } from 'react';

export interface InteractiveGridBackgroundProps {
  /** Cell width and height in CSS pixels. */
  gridSpacing?: number;
  /** Dot radius in CSS pixels. */
  dotSize?: number;
  /** Overall pattern opacity, from 0 to 1. */
  opacity?: number;
  /** Maximum distance a wave travels, in CSS pixels. */
  rippleRadius?: number;
  /** Dot/grid displacement in CSS pixels before wave attenuation. */
  strength?: number;
  /** Wave propagation speed in CSS pixels per second. */
  speed?: number;
  /** Exponential decay rate per second; larger values settle sooner. */
  damping?: number;
  highlightColor?: string;
  maxRipples?: number;
  maxDpr?: number;
}

export const DEFAULT_GRID_SETTINGS = {
  gridSpacing: 56,
  dotSize: 0.9,
  opacity: 0.42,
  rippleRadius: 420,
  strength: 5,
  speed: 160,
  damping: 1.35,
  highlightColor: '#baff4b',
  maxRipples: 8,
  maxDpr: 1.5,
} satisfies Required<InteractiveGridBackgroundProps>;

type Ripple = { x: number; y: number; born: number };
type Wave = Ripple & {
  radius: number;
  amplitude: number;
  innerSquared: number;
  outerSquared: number;
};
type Runtime = {
  frame: number | null;
  disposed: boolean;
  resizePending: boolean;
  width: number;
  height: number;
  interactive: boolean;
  ripples: Ripple[];
  pointer: { x: number; y: number } | null;
  distance: number;
  lastSpawn: number;
  highlights: number[];
};

function bounded(value: number, fallback: number, min: number, max: number) {
  return Number.isFinite(value)
    ? Math.max(min, Math.min(max, value))
    : fallback;
}

export default function InteractiveGridBackground({
  gridSpacing = DEFAULT_GRID_SETTINGS.gridSpacing,
  dotSize = DEFAULT_GRID_SETTINGS.dotSize,
  opacity = DEFAULT_GRID_SETTINGS.opacity,
  rippleRadius = DEFAULT_GRID_SETTINGS.rippleRadius,
  strength = DEFAULT_GRID_SETTINGS.strength,
  speed = DEFAULT_GRID_SETTINGS.speed,
  damping = DEFAULT_GRID_SETTINGS.damping,
  highlightColor = DEFAULT_GRID_SETTINGS.highlightColor,
  maxRipples = DEFAULT_GRID_SETTINGS.maxRipples,
  maxDpr = DEFAULT_GRID_SETTINGS.maxDpr,
}: InteractiveGridBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runtimeRef = useRef<Runtime | null>(null);
  const spacing = bounded(gridSpacing, 56, 32, 160);
  const size = bounded(dotSize, 0.9, 0.25, 3);
  const alpha = bounded(opacity, 0.42, 0, 1);
  const radiusLimit = bounded(rippleRadius, 420, 100, 900);
  const displacement = bounded(strength, 5, 0, 16);
  const velocity = bounded(speed, 160, 60, 500);
  const decay = bounded(damping, 1.35, 0.5, 5);
  const rippleLimit = Math.floor(bounded(maxRipples, 8, 1, 16));
  const dprLimit = bounded(maxDpr, 1.5, 1, 2);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas || alpha === 0) return;
    const context = canvas.getContext('2d', { alpha: true });
    // CSS supplies the same static pattern before hydration and without Canvas.
    if (!context) return;
    const ctx = context;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const runtime: Runtime = {
      frame: null,
      disposed: false,
      resizePending: true,
      width: 0,
      height: 0,
      interactive: false,
      ripples: [],
      pointer: null,
      distance: 0,
      lastSpawn: -Infinity,
      highlights: [],
    };
    runtimeRef.current = runtime;
    const band = spacing * 0.7;
    const maxShift = Math.min(spacing * 0.18, displacement * 1.8);
    // One reusable sample avoids allocating thousands of point objects per frame.
    const sample = { x: 0, y: 0, highlight: 0 };
    let resolutionQuery: MediaQueryList | null = null;

    function requestDraw() {
      if (!runtime.disposed && !document.hidden && runtime.frame === null) {
        runtime.frame = window.requestAnimationFrame(render);
      }
    }

    function resize() {
      const rect = host!.getBoundingClientRect();
      runtime.width = rect.width;
      runtime.height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, dprLimit);
      canvas!.width = Math.max(1, Math.round(rect.width * dpr));
      canvas!.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      runtime.resizePending = false;
    }

    function field(x: number, y: number, waves: Wave[]) {
      let offsetX = 0;
      let offsetY = 0;
      let light = 0;
      for (const wave of waves) {
        const dx = x - wave.x;
        const dy = y - wave.y;
        const squared = dx * dx + dy * dy;
        // Most samples are outside a wave packet; skip its expensive math there.
        if (squared > wave.outerSquared || squared < wave.innerSquared)
          continue;
        const distance = Math.sqrt(squared);
        if (distance < 0.001) continue;
        const phase = (distance - wave.radius) / band;
        const envelope = Math.exp(-0.5 * phase * phase) * wave.amplitude;
        const shift = Math.sin(phase * 1.8) * envelope * displacement;
        offsetX += (dx / distance) * shift;
        offsetY += (dy / distance) * shift;
        light += Math.max(0, Math.cos(phase * 1.8)) * envelope;
      }
      const shiftedSquared = offsetX * offsetX + offsetY * offsetY;
      if (shiftedSquared > maxShift * maxShift && shiftedSquared > 0) {
        const scale = maxShift / Math.sqrt(shiftedSquared);
        offsetX *= scale;
        offsetY *= scale;
      }
      sample.x = x + offsetX;
      sample.y = y + offsetY;
      sample.highlight = Math.min(light, 1);
    }

    function curvedLine(position: number, vertical: boolean, waves: Wave[]) {
      const length = vertical ? runtime.height : runtime.width;
      field(
        vertical ? position : -spacing,
        vertical ? -spacing : position,
        waves,
      );
      let previousX = sample.x;
      let previousY = sample.y;
      ctx.moveTo(previousX, previousY);
      for (
        let step = -spacing / 2;
        step <= length + spacing;
        step += spacing / 2
      ) {
        field(vertical ? position : step, vertical ? step : position, waves);
        ctx.quadraticCurveTo(
          previousX,
          previousY,
          (previousX + sample.x) / 2,
          (previousY + sample.y) / 2,
        );
        previousX = sample.x;
        previousY = sample.y;
      }
      ctx.lineTo(previousX, previousY);
    }

    function paint(waves: Wave[]) {
      const { width, height, highlights } = runtime;
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgb(131, 154, 140)';
      ctx.lineWidth = 0.85;
      ctx.globalAlpha = 0.36;
      ctx.beginPath();
      for (let x = 0; x <= width + spacing; x += spacing) {
        if (waves.length) curvedLine(x, true, waves);
        else {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }
      }
      for (let y = 0; y <= height + spacing; y += spacing) {
        if (waves.length) curvedLine(y, false, waves);
        else {
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }
      }
      ctx.stroke();

      highlights.length = 0;
      ctx.fillStyle = 'rgb(140, 164, 149)';
      ctx.globalAlpha = 0.52;
      ctx.beginPath();
      for (let y = spacing / 2; y < height; y += spacing) {
        for (let x = spacing / 2; x < width; x += spacing) {
          if (waves.length) field(x, y, waves);
          else {
            sample.x = x;
            sample.y = y;
            sample.highlight = 0;
          }
          ctx.moveTo(sample.x + size, sample.y);
          ctx.arc(sample.x, sample.y, size, 0, Math.PI * 2);
          if (sample.highlight > 0.015)
            highlights.push(sample.x, sample.y, sample.highlight);
        }
      }
      ctx.fill();
      ctx.fillStyle = highlightColor;
      for (let index = 0; index < highlights.length; index += 3) {
        const light = highlights[index + 2];
        ctx.globalAlpha = light * 0.95;
        ctx.beginPath();
        ctx.arc(
          highlights[index],
          highlights[index + 1],
          size * (1 + light * 0.16),
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      host!.dataset.renderer = 'canvas';
    }

    function render(now: number) {
      runtime.frame = null;
      if (runtime.disposed || document.hidden) return;
      if (runtime.resizePending) resize();
      const waves: Wave[] = [];
      runtime.ripples = runtime.ripples.filter((ripple) => {
        const age = Math.max(0, (now - ripple.born) / 1000);
        const radius = age * velocity;
        const distanceFade = Math.max(0, 1 - (radius / radiusLimit) ** 3);
        const amplitude = Math.exp(-decay * age) * distanceFade;
        if (radius >= radiusLimit || amplitude < 0.006) return false;
        const rise = Math.min(age / 0.16, 1);
        waves.push({
          ...ripple,
          radius,
          amplitude: amplitude * rise * rise * (3 - 2 * rise),
          innerSquared: Math.max(0, radius - band * 3) ** 2,
          outerSquared: (radius + band * 3) ** 2,
        });
        return true;
      });
      paint(waves);
      // The final frame restores the exact static pattern, then the loop sleeps.
      if (runtime.ripples.length) requestDraw();
    }

    function resetPointer() {
      runtime.pointer = null;
      runtime.distance = 0;
    }

    function onPointerMove(event: PointerEvent) {
      if (
        !runtime.interactive ||
        document.hidden ||
        event.pointerType !== 'mouse'
      )
        return;
      const { clientX: x, clientY: y } = event;
      if (runtime.pointer)
        runtime.distance += Math.hypot(
          x - runtime.pointer.x,
          y - runtime.pointer.y,
        );
      runtime.pointer = { x, y };
      const now = performance.now();
      // Both traveled distance and elapsed time must qualify; pointer-event bursts
      // cannot create a stack of waves at one position.
      if (
        runtime.distance < Math.max(28, spacing * 0.65) ||
        now - runtime.lastSpawn < 110
      )
        return;
      runtime.distance = 0;
      runtime.lastSpawn = now;
      if (runtime.ripples.length >= rippleLimit) runtime.ripples.shift();
      runtime.ripples.push({ x, y, born: now });
      requestDraw();
    }

    function updateMode() {
      window.removeEventListener('pointermove', onPointerMove);
      runtime.interactive = !reducedMotion.matches && finePointer.matches;
      runtime.ripples.length = 0;
      resetPointer();
      host!.dataset.gridMode = runtime.interactive ? 'interactive' : 'static';
      if (runtime.interactive)
        window.addEventListener('pointermove', onPointerMove, {
          passive: true,
        });
      requestDraw();
    }

    function onResize() {
      runtime.resizePending = true;
      requestDraw();
    }
    function onPointerOut(event: PointerEvent) {
      if (!event.relatedTarget) resetPointer();
    }
    function onVisibilityChange() {
      resetPointer();
      if (document.hidden) {
        if (runtime.frame !== null) window.cancelAnimationFrame(runtime.frame);
        runtime.frame = null;
      } else requestDraw(); // Age waves against real elapsed time after resuming.
    }
    function watchResolution() {
      resolutionQuery?.removeEventListener('change', onResolutionChange);
      resolutionQuery = window.matchMedia(
        `(resolution: ${window.devicePixelRatio || 1}dppx)`,
      );
      resolutionQuery.addEventListener('change', onResolutionChange);
    }
    function onResolutionChange() {
      watchResolution();
      onResize();
    }

    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(onResize)
        : null;
    observer?.observe(host);
    reducedMotion.addEventListener('change', updateMode);
    finePointer.addEventListener('change', updateMode);
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('pointerout', onPointerOut, { passive: true });
    window.addEventListener('blur', resetPointer);
    document.addEventListener('visibilitychange', onVisibilityChange);
    watchResolution();
    updateMode();

    return () => {
      runtime.disposed = true;
      if (runtime.frame !== null) window.cancelAnimationFrame(runtime.frame);
      observer?.disconnect();
      reducedMotion.removeEventListener('change', updateMode);
      finePointer.removeEventListener('change', updateMode);
      resolutionQuery?.removeEventListener('change', onResolutionChange);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointerout', onPointerOut);
      window.removeEventListener('blur', resetPointer);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (runtimeRef.current === runtime) runtimeRef.current = null;
    };
  }, [
    spacing,
    size,
    alpha,
    radiusLimit,
    displacement,
    velocity,
    decay,
    highlightColor,
    rippleLimit,
    dprLimit,
  ]);

  return (
    <div
      ref={hostRef}
      className="portfolio-grid-background"
      aria-hidden="true"
      data-grid-mode="static"
      style={
        {
          '--grid-spacing': `${spacing}px`,
          '--grid-dot-size': `${size}px`,
          opacity: alpha,
        } as CSSProperties
      }
    >
      <canvas ref={canvasRef} data-grid-canvas aria-hidden="true" />
    </div>
  );
}
