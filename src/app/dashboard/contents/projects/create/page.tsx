'use client';
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import {
  Field,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { useRouter } from 'next/navigation';
import { useSkillsQuery } from '@/hooks/frontend/useSkills';
import { Form } from '@/components/ui/form';
import { RhfTextInput, RhfTextarea } from '@/components/formComponent';
import { toast } from 'sonner';
import { useCreateProjectMutation } from '@/hooks/frontend/useProject';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { projectTypeValues } from '@/modules/project/project.validation';

type Detail = {
  title: string;
  description: string;
  comment?: string;
};

type ProjectFormValues = {
  projectType: (typeof projectTypeValues)[number];
  imageUrl: string;
  title: string;
  subTitle: string;
  skills: string[];
  liveUrl: string;
  gitFront: string;
  gitBackend: string;
  details: Detail[];
};

const DEFAULT_VALUES: ProjectFormValues = {
  projectType: 'personal',
  imageUrl: '',
  title: '',
  subTitle: '',
  skills: [],
  liveUrl: '',
  gitFront: '',
  gitBackend: '',
  details: [
    {
      title: '',
      description: '',
      comment: '',
    },
  ],
};

export function ProjectCreateForm() {
  const { data: availableSkills = [], isLoading: isSkillsLoading } =
    useSkillsQuery();

  const router = useRouter();
  const createProjectMutation = useCreateProjectMutation();

  const form = useForm<ProjectFormValues>({
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'details',
  });

  function handleFormSubmit(values: ProjectFormValues) {
    createProjectMutation.mutate(values, {
      onSuccess: () => {
        toast.success('Project created');
        form.reset(DEFAULT_VALUES);
        router.push('/dashboard/contents/projects');
      },
      onError: (error: unknown) => {
        toast.error(
          error instanceof Error ? error.message : 'Failed to create project',
        );
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4"
        aria-describedby="project-form-desc relative z-20"
      >
        <p id="project-form-desc" className="sr-only">
          Form to create or edit a project. Use the buttons to add or remove
          project details.
        </p>

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
          <RhfTextInput
            control={control}
            name="title"
            label="Title"
            placeholder="Project title"
          />
          <RhfTextInput
            control={control}
            name="subTitle"
            label="Subtitle"
            placeholder="Short subtitle"
          />
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
            rules={{
              validate: (value) =>
                (Array.isArray(value) && value.length > 0) ||
                'Select at least one skill',
            }}
            render={({ field }) => {
              const selectedIds = Array.isArray(field.value) ? field.value : [];

              return (
                <FormItem>
                  <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                    {availableSkills.map((skill) => {
                      const checked = selectedIds.includes(skill._id);
                      return (
                        <Field key={skill._id} orientation="horizontal">
                          <Checkbox
                            id={`skill-${skill._id}`}
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
                            htmlFor={`skill-${skill._id}`}
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
            placeholder="https://..."
          />
          <RhfTextInput
            control={control}
            name="gitFront"
            label="Frontend Repo"
            placeholder="https://github.com/..."
          />
          <RhfTextInput
            control={control}
            name="gitBackend"
            label="Backend Repo"
            placeholder="https://github.com/..."
          />
          <RhfTextInput
            control={control}
            name="imageUrl"
            label="Image URL"
            placeholder="https://..."
          />
        </div>

        <fieldset aria-labelledby="details-legend" className="space-y-2">
          <legend id="details-legend" className="text-sm font-medium">
            Details
          </legend>

          {fields.map((field, index) => (
            <div key={field.id} className="p-3 border rounded space-y-3">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium">Detail #{index + 1}</p>
                <div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    aria-label={`Remove detail ${index + 1}`}
                  >
                    Remove
                  </Button>
                </div>
              </div>

              <RhfTextInput
                control={control}
                name={`details.${index}.title` as const}
                label="Detail title"
                placeholder="Feature title"
              />

              <RhfTextarea
                control={control}
                name={`details.${index}.description` as const}
                label="Description"
                rows={3}
                placeholder="Feature description..."
              />

              <RhfTextInput
                control={control}
                name={`details.${index}.comment` as const}
                label="Comment (optional)"
                placeholder="Optional comment"
              />
            </div>
          ))}

        <div>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                title: '',
                description: '',
                comment: '',
              })
            }
            aria-label="Add detail"
          >
            Add detail
          </Button>
        </div>
        </fieldset>

        <div className="flex justify-end gap-2">
          <Button
            className="bg-gradient-to-r from-green-400 font-bold to-blue-500"
            type="submit"
            disabled={isSubmitting || createProjectMutation.isPending}
          >
            {isSubmitting || createProjectMutation.isPending
              ? 'Saving…'
              : 'Save project'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default function CreateProjectPage() {
  const router = useRouter();
  return (
    <div className="container mx-auto ">
      <Button variant="ghost" onClick={() => router.back()}>
        <IoReturnUpBackOutline /> Back
      </Button>
      <div className="max-w-4xl relative mx-auto p-6 border rounded-lg bg-gradient-to-b from-white/20 to-white/50 shadow-lg backdrop-blur-lg  ">
        <h1 className="text-2xl font-bold mb-6">Create New Project</h1>
        <ProjectCreateForm />
      </div>
    </div>
  );
}
