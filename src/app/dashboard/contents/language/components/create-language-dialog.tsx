'use client';

import LanguageFormDialog from './language-form-dialog';
import type { LanguageInput } from '@/modules/language/language.validation';

const initialValues: LanguageInput = {
  name: '',
  level: '',
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting: boolean;
  onCreate: (values: LanguageInput) => Promise<void>;
};

export default function CreateLanguageDialog({
  open,
  onOpenChange,
  isSubmitting,
  onCreate,
}: Props) {
  return (
    <LanguageFormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Language"
      description="Add a new language entry."
      triggerLabel="Create Language"
      submitLabel="Create"
      defaultValues={initialValues}
      isSubmitting={isSubmitting}
      onSubmit={onCreate}
    />
  );
}
