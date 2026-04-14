'use client';

import AdditionalTrainingFormDialog from './additional-training-form-dialog';
import type { IAdditionalTraining } from '@/modules/additional-training/additional-training.interface';
import type { AdditionalTrainingInput } from '@/modules/additional-training/additional-training.validation';

type Props = {
  item: IAdditionalTraining;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting: boolean;
  onUpdate: (values: AdditionalTrainingInput) => Promise<void>;
};

export default function UpdateAdditionalTrainingDialog({
  item,
  open,
  onOpenChange,
  isSubmitting,
  onUpdate,
}: Props) {
  return (
    <AdditionalTrainingFormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Update Additional Training"
      description="Edit title and description."
      triggerLabel="Edit"
      submitLabel="Update"
      defaultValues={{
        title: item.title,
        description: item.description,
      }}
      isSubmitting={isSubmitting}
      onSubmit={onUpdate}
      triggerVariant="outline"
    />
  );
}
