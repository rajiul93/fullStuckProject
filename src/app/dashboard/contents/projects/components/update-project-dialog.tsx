'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import { RhfTextInput, RhfTextarea } from '@/components/formComponent';
import {
  Field,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { useSkillsQuery } from '@/hooks/frontend/useSkills';
import { useUpdateProjectMutation } from '@/hooks/frontend/useProject';
import {
  projectSchema,
  projectTypeValues,
  type ProjectInput,
} from '@/modules/project/project.validation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type UpdateProjectDialogProps = {
  projectId: string;
  defaultValues: ProjectInput;
  triggerLabel?: string;
};

export default function UpdateProjectDialog({
  projectId,
  defaultValues,
  triggerLabel = 'Update',
}: UpdateProjectDialogProps) {
  const { data: availableSkills = [], isLoading: isSkillsLoading } =
    useSkillsQuery();
  const updateMutation = useUpdateProjectMutation();

  const form = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'details',
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const onSubmit = (values: ProjectInput) => {
    updateMutation.mutate(
      { id: projectId, payload: values },
      {
        onSuccess: () => toast.success('Project updated'),
        onError: (err) =>
          toast.error(err instanceof Error ? err.message : 'Update failed'),
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
          <DialogDescription>
            Edit project fields and save to update.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Type</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projectTypeValues.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <RhfTextInput control={control} name="title" label="Title" />
              <RhfTextInput control={control} name="subTitle" label="Subtitle" />
            </div>

            <div>
              <FieldSet>
                <FieldLegend variant="label">Skills</FieldLegend>
                {isSkillsLoading && (
                  <p className="text-sm text-muted-foreground mb-2">
                    Loading skills...
                  </p>
                )}
                <FormField
                  control={control}
                  name="skills"
                  render={({ field }) => {
                    const selectedIds = Array.isArray(field.value)
                      ? field.value
                      : [];

                    return (
                      <FormItem>
                        <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                          {availableSkills.map((skill) => {
                            const checked = selectedIds.includes(skill._id);
                            return (
                              <Field key={skill._id} orientation="horizontal">
                                <Checkbox
                                  id={`upd-skill-${skill._id}`}
                                  checked={checked}
                                  onCheckedChange={(next) => {
                                    const isChecked = Boolean(next);
                                    if (isChecked) {
                                      field.onChange([...selectedIds, skill._id]);
                                    } else {
                                      field.onChange(
                                        selectedIds.filter((id) => id !== skill._id),
                                      );
                                    }
                                  }}
                                />
                                <FieldLabel
                                  htmlFor={`upd-skill-${skill._id}`}
                                  className="font-normal"
                                >
                                  {skill.title}
                                </FieldLabel>
                              </Field>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </FieldSet>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RhfTextInput
                control={control}
                name="liveUrl"
                label="Live URL"
              />
              <RhfTextInput
                control={control}
                name="gitFront"
                label="Frontend Repo"
              />
              <RhfTextInput
                control={control}
                name="gitBackend"
                label="Backend Repo"
              />
              <RhfTextInput
                control={control}
                name="imageUrl"
                label="Image URL"
              />
            </div>

            <fieldset aria-labelledby="upd-details-legend" className="space-y-2">
              <legend id="upd-details-legend" className="text-sm font-medium">
                Details
              </legend>
              {fields.map((f, index) => (
                <div key={f.id} className="p-3 border rounded space-y-3">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium">Detail #{index + 1}</p>
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
                    name={`details.${index}.title` as const}
                    label="Detail title"
                  />
                  <RhfTextarea
                    control={control}
                    name={`details.${index}.description` as const}
                    label="Description"
                    rows={3}
                  />
                  <RhfTextInput
                    control={control}
                    name={`details.${index}.comment` as const}
                    label="Comment (optional)"
                  />
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() => append({ title: '', description: '', comment: '' })}
              >
                Add detail
              </Button>
            </fieldset>

            <DialogFooter>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? 'Updating…' : 'Update'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

