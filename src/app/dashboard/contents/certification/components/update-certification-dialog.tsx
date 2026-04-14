'use client';

import CertificationFormDialog from './certification-form-dialog';
import type { ICertification } from '@/modules/certification/certification.interface';
import type { CertificationInput } from '@/modules/certification/certification.validation';

type Props = {
  item: ICertification;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting: boolean;
  onUpdate: (values: CertificationInput) => Promise<void>;
};

export default function UpdateCertificationDialog({
  item,
  open,
  onOpenChange,
  isSubmitting,
  onUpdate,
}: Props) {
  return (
    <CertificationFormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Update Certification"
      description="Edit certification details."
      triggerLabel="Edit"
      submitLabel="Update"
      defaultValues={{ name: item.name, issuer: item.issuer }}
      isSubmitting={isSubmitting}
      onSubmit={onUpdate}
      triggerVariant="outline"
    />
  );
}
