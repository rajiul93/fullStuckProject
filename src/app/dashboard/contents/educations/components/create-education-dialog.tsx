'use client';

import EducationFormDialog from './education-form-dialog';
import type { EducationInput } from '@/modules/education/education.validation';

const initialValues: EducationInput = {
  position: 1,
  degree: '',
  institution: '',
  period: '',
  location: '',
};

type CreateEducationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting: boolean;
  onCreate: (values: EducationInput) => Promise<void>;
};

export default function CreateEducationDialog({
  open,
  onOpenChange,
  isSubmitting,
  onCreate,
}: CreateEducationDialogProps) {
  return (
    <EducationFormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Education"
      description="Add a new education entry to your profile."
      triggerLabel="Create Education"
      submitLabel="Create"
      defaultValues={initialValues}
      isSubmitting={isSubmitting}
      onSubmit={onCreate}
    />
  );
}
