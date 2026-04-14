import { Router } from 'express';
import multer from 'multer';
import { MediaService } from '@/modules/media/media.service';
import { requireJwt, requireRole } from '../middleware/auth';
import { validateRequest } from '../middleware/validate-request';
import { mediaAltSchema } from '@/modules/media/media.validation';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    const ok = /^image\/(jpeg|png|webp|gif)$/.test(file.mimetype);
    // Multer's callback typing is strict; cast to support error + boolean.
    (cb as unknown as (error: Error | null, accept: boolean) => void)(
      ok ? null : new Error('Invalid image type'),
      ok,
    );
  },
});

export const mediaRouter = Router();

// Public list + get
mediaRouter.get('/', async (req, res) => {
  try {
    const result = await MediaService.list(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    return res.json(result);
  } catch (e) {
    return res.status(500).json({ error: 'Failed to fetch images' });
  }
});

mediaRouter.get('/:id', async (req, res) => {
  try {
    const doc = await MediaService.getById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Image not found' });
    return res.json(doc);
  } catch (e: any) {
    return res.status(400).json({ error: e?.message || 'Invalid request' });
  }
});

/** Same as dashboard usage: any logged-in user (`user` | `admin`) may manage media. */
const MEDIA_MUTATION_ROLES = ['user', 'admin', 'sub-admin'] as const;

// Protected mutations (role-based)
mediaRouter.post(
  '/',
  requireJwt,
  requireRole([...MEDIA_MUTATION_ROLES]),
  upload.single('image'),
  validateRequest(mediaAltSchema),
  async (req, res) => {
    try {
      const file = req.file;
      const created = await MediaService.upload(file as any, req.body.alt);
      return res.status(201).json(created);
    } catch (e: any) {
      return res.status(400).json({ error: e?.message || 'Upload failed' });
    }
  },
);

mediaRouter.put(
  '/:id',
  requireJwt,
  requireRole([...MEDIA_MUTATION_ROLES]),
  upload.single('image'),
  validateRequest(mediaAltSchema),
  async (req, res) => {
    try {
      const updated = await MediaService.update(
        String(req.params.id),
        req.file as any,
        req.body.alt,
      );
      if (!updated) return res.status(404).json({ error: 'Image not found' });
      return res.json(updated);
    } catch (e: any) {
      return res.status(400).json({ error: e?.message || 'Update failed' });
    }
  },
);

mediaRouter.delete(
  '/:id',
  requireJwt,
  requireRole([...MEDIA_MUTATION_ROLES]),
  async (req, res) => {
    try {
      const deleted = await MediaService.delete(String(req.params.id));
      if (!deleted) return res.status(404).json({ error: 'Image not found' });
      return res.json({ message: 'Image deleted successfully' });
    } catch (e: any) {
      return res.status(400).json({ error: e?.message || 'Delete failed' });
    }
  },
);

