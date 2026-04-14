'use client';

import BlogV2FormDialog from './blog-v2-form-dialog';
import { fromApiPayload, type BlogV2FormValues } from './blog-v2-types';

type Props = {
  blogId: string;
  defaultValues: {
    title: string;
    shortDescription: string;
    description: string;
    listContainer: Array<{ listTitle: string; list: string[] }>;
  };
  isSubmitting: boolean;
  onUpdate: (values: BlogV2FormValues) => Promise<void>;
};

export default function UpdateBlogV2Dialog({
  defaultValues,
  isSubmitting,
  onUpdate,
}: Props) {
  return (
    <BlogV2FormDialog
      triggerLabel="Update"
      title="Update Blog"
      description="Update an existing blog entry."
      submitLabel="Update"
      defaultValues={fromApiPayload(defaultValues)}
      isSubmitting={isSubmitting}
      onSubmit={onUpdate}
      triggerVariant="outline"
    />
  );
}

