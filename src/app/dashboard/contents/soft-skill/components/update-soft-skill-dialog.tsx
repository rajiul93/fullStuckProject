'use client';

import SoftSkillFormDialog from './soft-skill-form-dialog';
import type { ISoftSkill } from '@/modules/soft-skill/soft-skill.interface';
import type { SoftSkillInput } from '@/modules/soft-skill/soft-skill.validation';

type Props = {
  item: ISoftSkill;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting: boolean;
  onUpdate: (values: SoftSkillInput) => Promise<void>;
};

export default function UpdateSoftSkillDialog({
  item,
  open,
  onOpenChange,
  isSubmitting,
  onUpdate,
}: Props) {
  return (
    <SoftSkillFormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Update Soft Skill"
      description="Edit soft skill fields."
      triggerLabel="Edit"
      submitLabel="Update"
      defaultValues={{
        position: item.position,
        icon: item.icon,
        title: item.title,
        description: item.description,
      }}
      isSubmitting={isSubmitting}
      onSubmit={onUpdate}
      triggerVariant="outline"
    />
  );
}
