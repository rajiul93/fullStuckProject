'use client';

import AdditionalTrainingFormDialog from './additional-training-form-dialog';
import type { AdditionalTrainingInput } from '@/modules/additional-training/additional-training.validation';

const initialValues: AdditionalTrainingInput = {
  title: '',
  description: '',
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting: boolean;
  onCreate: (values: AdditionalTrainingInput) => Promise<void>;
};

export default function CreateAdditionalTrainingDialog({
  open,
  onOpenChange,
  isSubmitting,
  onCreate,
}: Props) {
  return (
    <AdditionalTrainingFormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Additional Training"
      description="Add an additional training item to your profile."
      triggerLabel="Create Training"
      submitLabel="Create"
      defaultValues={initialValues}
      isSubmitting={isSubmitting}
      onSubmit={onCreate}
    />
  );
}
