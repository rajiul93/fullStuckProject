'use client';

import BlogV2FormDialog from './blog-v2-form-dialog';
import type { BlogV2FormValues } from './blog-v2-types';

const initialValues: BlogV2FormValues = {
  title: '',
  shortDescription: '',
  description: '',
  listContainer: [],
};

type Props = {
  isSubmitting: boolean;
  onCreate: (values: BlogV2FormValues) => Promise<void>;
};

export default function CreateBlogV2Dialog({ isSubmitting, onCreate }: Props) {
  return (
    <BlogV2FormDialog
      triggerLabel="Create Blog"
      title="Create Blog"
      description="Create a new blog entry."
      submitLabel="Create"
      defaultValues={initialValues}
      isSubmitting={isSubmitting}
      onSubmit={onCreate}
    />
  );
}

