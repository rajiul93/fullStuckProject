/**
 * Optional legacy Express server. Media CRUD is implemented in Next.js Route Handlers
 * (`src/app/api/media`). Use this only if you still need the same routes on another port.
 */
import './load-env';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { mediaRouter } from './routes/media.routes';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/media', mediaRouter);

const port = Number(process.env.MEDIA_PORT || 4001);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Media server listening on http://localhost:${port}`);
});
