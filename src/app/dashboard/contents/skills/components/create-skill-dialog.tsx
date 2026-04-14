'use client';

import SkillFormDialog from './skill-form-dialog';
import type { SkillFormValues } from './skill-types';

const initialValues: SkillFormValues = {
  title: '',
  imageId: '',
  subDescription: '',
  feature: false,
};

type CreateSkillDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting: boolean;
  onCreate: (values: SkillFormValues) => Promise<void>;
};

export default function CreateSkillDialog({
  open,
  onOpenChange,
  isSubmitting,
  onCreate,
}: CreateSkillDialogProps) {
  return (
    <SkillFormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Skill"
      description="Add a new skill to your collection."
      triggerLabel="Create Skill"
      submitLabel="Create"
      defaultValues={initialValues}
      isSubmitting={isSubmitting}
      onSubmit={onCreate}
    />
  );
}
