'use client';

import CertificationFormDialog from './certification-form-dialog';
import type { CertificationInput } from '@/modules/certification/certification.validation';

const initialValues: CertificationInput = {
  name: '',
  issuer: '',
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting: boolean;
  onCreate: (values: CertificationInput) => Promise<void>;
};

export default function CreateCertificationDialog({
  open,
  onOpenChange,
  isSubmitting,
  onCreate,
}: Props) {
  return (
    <CertificationFormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create Certification"
      description="Add a new certification entry."
      triggerLabel="Create Certification"
      submitLabel="Create"
      defaultValues={initialValues}
      isSubmitting={isSubmitting}
      onSubmit={onCreate}
    />
  );
}
