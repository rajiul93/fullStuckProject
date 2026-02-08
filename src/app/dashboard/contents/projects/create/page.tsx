'use client';
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { useRouter } from 'next/navigation';
import { Backpack } from 'lucide-react';

type Detail = {
  title: string;
  description: string;
  comment?: string;
};

type ProjectFormValues = {
  imageUrl: string;
  title: string;
  subTitle: string;
  skills: string[];
  liveUrl: string;
  gitFront: string;
  gitBackend: string;
  details: Detail[];
};

const AVAILABLE_SKILLS = [
  'React',
  'TypeScript',
  'Node.js',
  'MongoDB',
  'Next.js',
  'Express.js',
  'PostgreSQL',
  'Tailwind CSS',
  'Python',
  'Django',
  'Vue.js',
  'Angular',
];

const DEFAULT_VALUES: ProjectFormValues = {
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
  const form = useForm<ProjectFormValues>({
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'details',
  });

  function handleFormSubmit(values: ProjectFormValues) {
    console.log('Project submitted:', values);
  }

  return (
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
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            {...register('title', { required: 'Title is required' })}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <p
              id="title-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="subTitle">Subtitle</Label>
          <Input id="subTitle" {...register('subTitle')} />
        </div>
      </div>

      <div>
        <FieldSet>
          <FieldLegend variant="label">Skills</FieldLegend>
          <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {AVAILABLE_SKILLS.map((skill) => (
              <Field key={skill} orientation="horizontal">
                <Checkbox
                  id={`skill-${skill.toLowerCase().replace(/\./g, '-')}`}
                  {...register('skills')}
                  value={skill}
                />
                <FieldLabel
                  htmlFor={`skill-${skill.toLowerCase().replace(/\./g, '-')}`}
                  className="font-normal"
                >
                  {skill}
                </FieldLabel>
              </Field>
            ))}
          </div>
          {errors.skills && (
            <p role="alert" className="text-sm text-destructive mt-2">
              Please select at least one skill
            </p>
          )}
        </FieldSet>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="liveUrl">Live URL</Label>
          <Input
            id="liveUrl"
            {...register('liveUrl', {
              pattern: {
                value: /^https?:\/\//,
                message: 'Enter a valid URL',
              },
            })}
          />
        </div>
        <div>
          <Label htmlFor="gitFront">Frontend Repo</Label>
          <Input id="gitFront" {...register('gitFront')} />
        </div>
        <div>
          <Label htmlFor="gitBackend">Backend Repo</Label>
          <Input id="gitBackend" {...register('gitBackend')} />
        </div>
        <div>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            {...register('imageUrl', { required: 'Image URL is required' })}
            aria-invalid={!!errors.imageUrl}
            aria-describedby={errors.imageUrl ? 'imageUrl-error' : undefined}
          />
          {errors.imageUrl && (
            <p
              id="imageUrl-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.imageUrl.message}
            </p>
          )}
        </div>
      </div>

      <fieldset aria-labelledby="details-legend" className="space-y-2">
        <legend id="details-legend" className="text-sm font-medium">
          Details
        </legend>

        {fields.map((field, index) => (
          <div key={field.id} className="p-3 border rounded">
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

            <div className="mt-2">
              <Label htmlFor={`details.${index}.title`}>Detail title</Label>
              <Input
                id={`details.${index}.title`}
                {...register(`details.${index}.title` as const, {
                  required: 'Detail title is required',
                })}
                aria-invalid={!!errors.details?.[index]?.title}
                aria-describedby={
                  errors.details?.[index]?.title
                    ? `details-${index}-title-error`
                    : undefined
                }
              />
              {errors.details?.[index]?.title && (
                <p
                  id={`details-${index}-title-error`}
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.details?.[index]?.title?.message as string}
                </p>
              )}
            </div>

            <div className="mt-2">
              <Label htmlFor={`details.${index}.description`}>
                Description
              </Label>
              <Textarea
                id={`details.${index}.description`}
                {...register(`details.${index}.description` as const, {
                  required: 'Description is required',
                })}
                aria-invalid={!!errors.details?.[index]?.description}
                aria-describedby={
                  errors.details?.[index]?.description
                    ? `details-${index}-desc-error`
                    : undefined
                }
              />
              {errors.details?.[index]?.description && (
                <p
                  id={`details-${index}-desc-error`}
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.details?.[index]?.description?.message as string}
                </p>
              )}
            </div>

            <div className="mt-2">
              <Label htmlFor={`details.${index}.comment`}>
                Comment (optional)
              </Label>
              <Input
                id={`details.${index}.comment`}
                {...register(`details.${index}.comment` as const)}
              />
            </div>
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
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving…' : 'Save project'}
        </Button>
      </div>
    </form>
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
