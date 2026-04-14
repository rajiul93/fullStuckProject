'use client';

import LanguageFormDialog from './language-form-dialog';
import type { ILanguage } from '@/modules/language/language.interface';
import type { LanguageInput } from '@/modules/language/language.validation';

type Props = {
  item: ILanguage;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting: boolean;
  onUpdate: (values: LanguageInput) => Promise<void>;
};

export default function UpdateLanguageDialog({
  item,
  open,
  onOpenChange,
  isSubmitting,
  onUpdate,
}: Props) {
  return (
    <LanguageFormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Update Language"
      description="Edit language name and level."
      triggerLabel="Edit"
      submitLabel="Update"
      defaultValues={{ name: item.name, level: item.level }}
      isSubmitting={isSubmitting}
      onSubmit={onUpdate}
      triggerVariant="outline"
    />
  );
}
