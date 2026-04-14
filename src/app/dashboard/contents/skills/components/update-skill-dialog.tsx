'use client';

import SkillFormDialog from './skill-form-dialog';
import type { SkillFormValues, SkillItem } from './skill-types';

type UpdateSkillDialogProps = {
  skill: SkillItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting: boolean;
  onUpdate: (values: SkillFormValues) => Promise<void>;
};

export default function UpdateSkillDialog({
  skill,
  open,
  onOpenChange,
  isSubmitting,
  onUpdate,
}: UpdateSkillDialogProps) {
  return (
    <SkillFormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Update Skill"
      description="Edit title, image ID, description, or feature status."
      triggerLabel="Edit"
      submitLabel="Update"
      defaultValues={{
        title: skill.title,
        imageId: skill.imageId,
        subDescription: skill.subDescription,
        feature: skill.feature,
      }}
      isSubmitting={isSubmitting}
      onSubmit={onUpdate}
      triggerVariant="outline"
    />
  );
}
