'use client';

import SoftSkillFormDialog from './soft-skill-form-dialog';
import type { SoftSkillInput } from '@/modules/soft-skill/soft-skill.validation';

const initialValues: SoftSkillInput = {
  position: 1,
  icon: '',
  title: '',
  description: '',
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting: boolean;
  onCreate: (values: SoftSkillInput) => Promise<void>;
};

export default function CreateSoftSkillDialog({
  open,
  onOpenChange,
  isSubmitting,
  onCreate,
}: Props) {
  return (
    <SoftSkillFormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Soft Skill"
      description="Add a new soft skill entry."
      triggerLabel="Create SoftSkill"
      submitLabel="Create"
      defaultValues={initialValues}
      isSubmitting={isSubmitting}
      onSubmit={onCreate}
    />
  );
}
