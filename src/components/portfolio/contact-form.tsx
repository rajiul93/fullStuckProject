'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  TriangleAlert,
} from 'lucide-react';

type Values = { name: string; email: string; message: string };
type Status = 'idle' | 'success' | 'error';
export default function PortfolioContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    mode: 'onTouched',
    defaultValues: { name: '', email: '', message: '' },
  });
  async function submit(values: Values) {
    setStatus('idle');
    setFeedback('');
    const service = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const template = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!service || !template || !publicKey) {
      setStatus('error');
      setFeedback(
        'The contact form is currently unavailable. Please email developer.rajiul@gmail.com directly.',
      );
      return;
    }
    try {
      await emailjs.send(
        service,
        template,
        { name: values.name, email: values.email, message: values.message },
        publicKey,
      );
      setStatus('success');
      setFeedback('Your message has been sent. Thanks for getting in touch.');
      reset();
    } catch {
      setStatus('error');
      setFeedback(
        'Your message could not be sent. Please try again or email me directly.',
      );
    }
  }
  return (
    <form
      className="portfolio-contact-form"
      onSubmit={handleSubmit(submit)}
      noValidate
      aria-label="Contact Rajiul"
      aria-busy={isSubmitting}
    >
      <div>
        <label htmlFor="contact-name">Your name</label>
        <input
          id="contact-name"
          autoComplete="name"
          placeholder="Your name"
          maxLength={120}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          {...register('name', {
            required: 'Please enter your name.',
            validate: (value) =>
              value.trim().length >= 2 || 'Please enter at least 2 characters.',
          })}
        />
        {errors.name && (
          <p id="contact-name-error" className="form-field-error">
            {errors.name.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="contact-email">Email address</label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          maxLength={254}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          {...register('email', {
            required: 'Please enter your email.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address.',
            },
          })}
        />
        {errors.email && (
          <p id="contact-email-error" className="form-field-error">
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="contact-message">Your message</label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder="Tell me about your project…"
          maxLength={5000}
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? 'contact-message-error' : undefined
          }
          {...register('message', {
            required: 'Please enter a message.',
            validate: (value) =>
              value.trim().length >= 10 ||
              'Please write at least 10 characters.',
          })}
        />
        {errors.message && (
          <p id="contact-message-error" className="form-field-error">
            {errors.message.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="portfolio-button button-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="form-spinner" size={16} /> Sending message…
          </>
        ) : (
          <>
            Send message <ArrowRight size={17} />
          </>
        )}
      </button>
      <div aria-live="polite" aria-atomic="true">
        {status !== 'idle' && (
          <p
            role={status === 'error' ? 'alert' : 'status'}
            className={`form-feedback form-${status}`}
          >
            {status === 'success' ? (
              <CheckCircle2 size={18} />
            ) : (
              <TriangleAlert size={18} />
            )}
            <span>
              {feedback}
              {status === 'error' && (
                <>
                  {' '}
                  <a href="mailto:developer.rajiul@gmail.com">
                    Send an email <ArrowRight size={13} />
                  </a>
                </>
              )}
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
