'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useCreateProjectMutation } from '@/hooks/frontend/useProject';
import { useSkillsQuery } from '@/hooks/frontend/useSkills';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { ProjectInput } from '@/modules/project/project.validation';
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

const defaultValues: ProjectInput = {
  imageUrl: '',
  title: '',
  subTitle: '',
  skills: [],
  liveUrl: '',
  gitFront: '',
  gitBackend: '',
  details: [{ title: '', description: '', comment: '' }],
};

export default function Projects() {
  const { data: skills = [], isLoading: isSkillsLoading } = useSkillsQuery();
  const createProjectMutation = useCreateProjectMutation();

  const form = useForm<ProjectInput>({ defaultValues });

  const onSubmit = (values: ProjectInput) => {
    createProjectMutation.mutate(values, {
      onSuccess: () => {
        toast.success('Project created');
        form.reset(defaultValues);
      },
      onError: (error: unknown) => {
        toast.error(
          error instanceof Error ? error.message : 'Failed to create project',
        );
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto rounded-lg border bg-background p-6">
      <h1 className="text-2xl font-semibold mb-4">Create Project</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Project title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtitle</FormLabel>
                <FormControl>
                  <Input placeholder="Short subtitle" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="liveUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Live URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/live" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gitFront"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frontend Git URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gitBackend"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Backend Git URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => {
              const selected = Array.isArray(field.value) ? field.value : [];
              return (
                <FormItem>
                  <FormLabel>Skills Checklist</FormLabel>
                  {isSkillsLoading ? (
                    <p className="text-sm text-muted-foreground">
                      Loading skills...
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {skills.map((skill) => {
                        const checked = selected.includes(skill._id);
                        return (
                          <label
                            key={skill._id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(next) => {
                                const isChecked = Boolean(next);
                                if (isChecked) {
                                  field.onChange([...selected, skill._id]);
                                } else {
                                  field.onChange(
                                    selected.filter((id) => id !== skill._id),
                                  );
                                }
                              }}
                            />
                            <span>{skill.title}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="details.0.title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detail Title</FormLabel>
                <FormControl>
                  <Input placeholder="Feature one" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details.0.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detail Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe project feature"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details.0.comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detail Comment (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Optional comment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={createProjectMutation.isPending}
            className="w-full"
          >
            {createProjectMutation.isPending ? 'Creating...' : 'Create Project'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
