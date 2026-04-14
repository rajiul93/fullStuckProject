import { z } from 'zod';

export const blogV2FormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  shortDescription: z.string().min(1, 'Short description is required').max(500),
  description: z.string().min(1, 'Description is required').max(5000),
  listContainer: z.array(
    z.object({
      listTitle: z.string().min(1, 'List title is required').max(200),
      /** newline-separated items in UI */
      listText: z.string(),
    }),
  ),
});

export type BlogV2FormValues = z.infer<typeof blogV2FormSchema>;

export function toApiPayload(values: BlogV2FormValues) {
  return {
    title: values.title,
    shortDescription: values.shortDescription,
    description: values.description,
    listContainer: values.listContainer.map((c) => ({
      listTitle: c.listTitle,
      list: c.listText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    })),
  };
}

export function fromApiPayload(payload: {
  title: string;
  shortDescription: string;
  description: string;
  listContainer: Array<{ listTitle: string; list: string[] }>;
}): BlogV2FormValues {
  return {
    title: payload.title,
    shortDescription: payload.shortDescription,
    description: payload.description,
    listContainer: (payload.listContainer ?? []).map((c) => ({
      listTitle: c.listTitle,
      listText: (c.list ?? []).join('\n'),
    })),
  };
}

