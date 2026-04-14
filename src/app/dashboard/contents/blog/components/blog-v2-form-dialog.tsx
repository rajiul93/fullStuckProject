'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { RhfTextInput, RhfTextarea } from '@/components/formComponent';
import { blogV2FormSchema, type BlogV2FormValues } from './blog-v2-types';

type BlogV2FormDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerLabel: string;
  title: string;
  description: string;
  submitLabel: string;
  defaultValues: BlogV2FormValues;
  isSubmitting: boolean;
  onSubmit: (values: BlogV2FormValues) => Promise<void>;
  triggerVariant?: 'default' | 'outline' | 'secondary' | 'ghost';
};

export default function BlogV2FormDialog({
  open,
  onOpenChange,
  triggerLabel,
  title,
  description,
  submitLabel,
  defaultValues,
  isSubmitting,
  onSubmit,
  triggerVariant = 'default',
}: BlogV2FormDialogProps) {
  const form = useForm<BlogV2FormValues>({
    resolver: zodResolver(blogV2FormSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'listContainer',
  });

  useEffect(() => {
    if (open === undefined || open) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant}>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[60vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={handleSubmit(async (values) => {
              await onSubmit(values);
            })}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RhfTextInput
                control={control}
                name="title"
                label="Title"
                placeholder="Blog title"
              />
              <RhfTextInput
                control={control}
                name="shortDescription"
                label="Short Description"
                placeholder="One-line summary"
              />
            </div>

            <RhfTextarea
              control={control}
              name="description"
              label="Description"
              rows={6}
              placeholder="Full description..."
            />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">List Containers</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ listTitle: '', listText: '' })}
                >
                  Add section
                </Button>
              </div>

              {fields.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Optional. Add sections with list items (one item per line).
                </p>
              ) : null}

              {fields.map((f, index) => (
                <div key={f.id} className="rounded-lg border p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Section #{index + 1}</p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </div>

                  <RhfTextInput
                    control={control}
                    name={`listContainer.${index}.listTitle` as const}
                    label="List Title"
                    placeholder="e.g. Key Features"
                  />

                  <RhfTextarea
                    control={control}
                    name={`listContainer.${index}.listText` as const}
                    label="List Items (one per line)"
                    rows={4}
                    placeholder={'Item 1\nItem 2\nItem 3'}
                  />
                </div>
              ))}
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving…' : submitLabel}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

