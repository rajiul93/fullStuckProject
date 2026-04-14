/** Client/server env. Empty string = same-origin (browser uses current host). */
export const config = {
  api: {
    baseUrl: (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/$/, ''),
  },
} as const;
