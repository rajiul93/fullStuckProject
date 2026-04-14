'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { skillFormSchema, type SkillFormValues } from './skill-types';

type SkillFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  triggerLabel: string;
  submitLabel: string;
  defaultValues: SkillFormValues;
  isSubmitting: boolean;
  onSubmit: (values: SkillFormValues) => Promise<void>;
  triggerVariant?: 'default' | 'outline' | 'secondary' | 'ghost';
};

export default function SkillFormDialog({
  open,
  onOpenChange,
  title,
  description,
  triggerLabel,
  submitLabel,
  defaultValues,
  isSubmitting,
  onSubmit,
  triggerVariant = 'default',
}: SkillFormDialogProps) {
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant}>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(async (values) => {
              await onSubmit(values);
              form.reset(values);
            })}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="React.js" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image ID</FormLabel>
                  <FormControl>
                    <Input placeholder="image_001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Description</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder="Skill details..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="feature"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(Boolean(checked))
                        }
                      />
                    </FormControl>
                    <FormLabel>Feature skill</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : submitLabel}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
