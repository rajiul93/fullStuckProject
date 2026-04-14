'use client';

import EducationFormDialog from './education-form-dialog';
import type { IEducation } from '@/modules/education/education.interface';
import type { EducationInput } from '@/modules/education/education.validation';

type UpdateEducationDialogProps = {
  education: IEducation;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting: boolean;
  onUpdate: (values: EducationInput) => Promise<void>;
};

export default function UpdateEducationDialog({
  education,
  open,
  onOpenChange,
  isSubmitting,
  onUpdate,
}: UpdateEducationDialogProps) {
  return (
    <EducationFormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Update Education"
      description="Edit degree, institution, period, and location."
      triggerLabel="Edit"
      submitLabel="Update"
      defaultValues={{
        position: education.position,
        degree: education.degree,
        institution: education.institution,
        period: education.period,
        location: education.location,
      }}
      isSubmitting={isSubmitting}
      onSubmit={onUpdate}
      triggerVariant="outline"
    />
  );
}
