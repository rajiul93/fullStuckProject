'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { api } from '@/hooks/api/api-client';
import { useEducationsQuery } from '@/hooks/frontend/useEducation';
import { useProjectsQuery } from '@/hooks/frontend/useProject';
import { useAdditionalTrainingsQuery } from '@/hooks/frontend/useAdditionalTraining';
import { useSoftSkillsQuery } from '@/hooks/frontend/useSoftSkill';
import { useLanguagesQuery } from '@/hooks/frontend/useLanguage';
import { useCertificationsQuery } from '@/hooks/frontend/useCertification';
import { useSkillsQuery } from '@/hooks/frontend/useSkills';

type ResumePayload = {
  personal: { name: string; title: string };
  contact: {
    phone: string;
    email: string;
    linkedInUrl: string;
    linkedInLabel: string;
    portfolioUrl: string;
    portfolioLabel: string;
    location: string;
  };
  sectionLabels: {
    summary: string;
    education: string;
    experience: string;
    additionalTraining: string;
    industrySkills: string;
    softSkills: string;
    personalProjects: string;
    keyFeatures: string;
    liveDemo: string;
    frontendGit: string;
    backendGit: string;
    project: string;
    languages: string;
    certifications: string;
    bullet: string;
  };
  summary: string;
  education: string[];
  experience: string[];
  personalProjects: string[];
  additionalTraining: string[];
  technologies: string[];
  softSkills: string[];
  languages: string[];
  certifications: string[];
};

const defaultPayload: ResumePayload = {
  personal: { name: '', title: '' },
  contact: {
    phone: '',
    email: '',
    linkedInUrl: '',
    linkedInLabel: 'LinkedIn',
    portfolioUrl: '',
    portfolioLabel: 'Portfolio',
    location: '',
  },
  sectionLabels: {
    summary: 'SUMMARY',
    education: 'EDUCATION',
    experience: 'EXPERIENCE',
    additionalTraining: 'ADDITIONAL TRAINING',
    industrySkills: 'SKILLS',
    softSkills: 'SOFT SKILLS',
    personalProjects: 'PERSONAL PROJECTS',
    keyFeatures: 'Key Features',
    liveDemo: 'Live Demo',
    frontendGit: 'Frontend GitHub',
    backendGit: 'Backend GitHub',
    project: 'Project',
    languages: 'LANGUAGES',
    certifications: 'CERTIFICATIONS',
    bullet: '•',
  },
  summary: '',
  education: [],
  experience: [],
  personalProjects: [],
  additionalTraining: [],
  technologies: [],
  softSkills: [],
  languages: [],
  certifications: [],
};

type ResumeListItem = { _id?: string };
type ResumeRefValue = string | { _id?: string } | null | undefined;

type ChecklistItem = { id: string; label: string; subLabel?: string };

function toIdArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      const entry = item as ResumeRefValue;
      if (typeof entry === 'string') return entry;
      if (entry && typeof entry === 'object' && entry._id) return String(entry._id);
      return '';
    })
    .filter(Boolean);
}

function mapResumeToForm(data: unknown): ResumePayload {
  const value = (data ?? {}) as Partial<ResumePayload> & {
    personal?: Partial<ResumePayload['personal']>;
    contact?: Partial<ResumePayload['contact']>;
    sectionLabels?: Partial<ResumePayload['sectionLabels']>;
  };

  return {
    personal: {
      name: value.personal?.name ?? '',
      title: value.personal?.title ?? '',
    },
    contact: {
      phone: value.contact?.phone ?? '',
      email: value.contact?.email ?? '',
      linkedInUrl: value.contact?.linkedInUrl ?? '',
      linkedInLabel: value.contact?.linkedInLabel ?? 'LinkedIn',
      portfolioUrl: value.contact?.portfolioUrl ?? '',
      portfolioLabel: value.contact?.portfolioLabel ?? 'Portfolio',
      location: value.contact?.location ?? '',
    },
    sectionLabels: {
      summary: value.sectionLabels?.summary ?? 'SUMMARY',
      education: value.sectionLabels?.education ?? 'EDUCATION',
      experience: value.sectionLabels?.experience ?? 'EXPERIENCE',
      additionalTraining:
        value.sectionLabels?.additionalTraining ?? 'ADDITIONAL TRAINING',
      industrySkills: value.sectionLabels?.industrySkills ?? 'SKILLS',
      softSkills: value.sectionLabels?.softSkills ?? 'SOFT SKILLS',
      personalProjects: value.sectionLabels?.personalProjects ?? 'PERSONAL PROJECTS',
      keyFeatures: value.sectionLabels?.keyFeatures ?? 'Key Features',
      liveDemo: value.sectionLabels?.liveDemo ?? 'Live Demo',
      frontendGit: value.sectionLabels?.frontendGit ?? 'Frontend GitHub',
      backendGit: value.sectionLabels?.backendGit ?? 'Backend GitHub',
      project: value.sectionLabels?.project ?? 'Project',
      languages: value.sectionLabels?.languages ?? 'LANGUAGES',
      certifications: value.sectionLabels?.certifications ?? 'CERTIFICATIONS',
      bullet: value.sectionLabels?.bullet ?? '•',
    },
    summary: value.summary ?? '',
    education: toIdArray(value.education),
    experience: toIdArray(value.experience),
    personalProjects: toIdArray(value.personalProjects),
    additionalTraining: toIdArray(value.additionalTraining),
    technologies: toIdArray(value.technologies),
    softSkills: toIdArray(value.softSkills),
    languages: toIdArray(value.languages),
    certifications: toIdArray(value.certifications),
  };
}

function ChecklistSection({
  title,
  items,
  selected,
  onToggle,
  loading,
}: {
  title: string;
  items: ChecklistItem[];
  selected: string[];
  onToggle: (id: string, checked: boolean) => void;
  loading?: boolean;
}) {
  return (
    <div className="rounded-md border p-4">
      <h3 className="font-medium mb-3">{title}</h3>
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No data found.</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <label key={item.id} className="flex items-start gap-2">
              <Checkbox
                checked={selected.includes(item.id)}
                onCheckedChange={(value) => onToggle(item.id, Boolean(value))}
              />
              <span className="text-sm">
                {item.label}
                {item.subLabel ? (
                  <span className="text-muted-foreground"> - {item.subLabel}</span>
                ) : null}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ResumeFormPage() {
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [isLoadingDefault, setIsLoadingDefault] = useState(true);

  const {
    register,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ResumePayload>({
    defaultValues: defaultPayload,
  });

  const { data: educations = [], isLoading: isEducationsLoading } = useEducationsQuery();
  const { data: projects = [], isLoading: isProjectsLoading } = useProjectsQuery();
  const { data: trainings = [], isLoading: isTrainingsLoading } =
    useAdditionalTrainingsQuery();
  const { data: skills = [], isLoading: isSkillsLoading } = useSkillsQuery();
  const { data: softSkills = [], isLoading: isSoftSkillsLoading } =
    useSoftSkillsQuery();
  const { data: languages = [], isLoading: isLanguagesLoading } = useLanguagesQuery();
  const { data: certifications = [], isLoading: isCertificationsLoading } =
    useCertificationsQuery();

  const educationItems: ChecklistItem[] = educations
    .filter((item) => item._id)
    .map((item) => ({
      id: String(item._id),
      label: `${item.position}. ${item.degree}`,
      subLabel: item.institution,
    }));

  const projectItems: ChecklistItem[] = projects
    .filter((item) => item._id)
    .map((item) => ({
      id: String(item._id),
      label: item.title,
      subLabel: item.subTitle,
    }));

  const trainingItems: ChecklistItem[] = trainings
    .filter((item) => item._id)
    .map((item) => ({
      id: String(item._id),
      label: item.title,
      subLabel: item.description,
    }));

  const technologyItems: ChecklistItem[] = skills
    .filter((item) => item._id)
    .map((item) => ({
      id: String(item._id),
      label: item.title,
      subLabel: item.subDescription,
    }));

  const softSkillItems: ChecklistItem[] = softSkills
    .filter((item) => item._id)
    .map((item) => ({
      id: String(item._id),
      label: `${item.position}. ${item.title}`,
      subLabel: item.description,
    }));

  const languageItems: ChecklistItem[] = languages
    .filter((item) => item._id)
    .map((item) => ({
      id: String(item._id),
      label: item.name,
      subLabel: item.level,
    }));

  const certificationItems: ChecklistItem[] = certifications
    .filter((item) => item._id)
    .map((item) => ({
      id: String(item._id),
      label: item.name,
      subLabel: item.issuer,
    }));

  const selectedEducation = watch('education');
  const selectedExperience = watch('experience');
  const selectedPersonalProjects = watch('personalProjects');
  const selectedAdditionalTraining = watch('additionalTraining');
  const selectedTechnologies = watch('technologies');
  const selectedSoftSkills = watch('softSkills');
  const selectedLanguages = watch('languages');
  const selectedCertifications = watch('certifications');

  const submitLabel = useMemo(() => {
    if (isSubmitting) return 'Submitting...';
    return currentResumeId ? 'Update Resume' : 'Create Resume';
  }, [currentResumeId, isSubmitting]);

  useEffect(() => {
    let active = true;
    async function loadDefaultResume() {
      setIsLoadingDefault(true);
      try {
        let targetId: string | null = null;
        if (typeof window !== 'undefined') {
          targetId = new URLSearchParams(window.location.search).get('id');
        }
        if (!targetId) {
          const listRes = await api.get<ResumeListItem[]>('/api/resume');
          targetId = listRes.data?.[0]?._id ?? null;
        }

        if (!targetId) {
          if (active) {
            setCurrentResumeId(null);
            reset(defaultPayload);
          }
          return;
        }

        const response = await api.get(`/api/resume/${targetId}`);
        if (!active) return;
        reset(mapResumeToForm(response.data));
        setCurrentResumeId(targetId);
      } catch {
        if (!active) return;
        toast.error('Failed to load default resume data');
      } finally {
        if (active) setIsLoadingDefault(false);
      }
    }

    loadDefaultResume();
    return () => {
      active = false;
    };
  }, [reset]);

  const toggleChecklistId = (
    key:
      | 'education'
      | 'experience'
      | 'personalProjects'
      | 'additionalTraining'
      | 'technologies'
      | 'softSkills'
      | 'languages'
      | 'certifications',
    id: string,
    checked: boolean,
  ) => {
    const existing = watch(key);
    const next = checked
      ? [...new Set([...(existing ?? []), id])]
      : (existing ?? []).filter((x) => x !== id);
    setValue(key, next, { shouldDirty: true });
  };

  const onSubmit = async (values: ResumePayload) => {
    try {
      if (currentResumeId) {
        await api.patch(`/api/resume/${currentResumeId}`, values);
        toast.success('Resume updated successfully');
      } else {
        const created = await api.post<{ _id?: string }>('/api/resume', values);
        if (created.data?._id) setCurrentResumeId(created.data._id);
        toast.success('Resume created successfully');
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to save resume';
      toast.error(message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="rounded-md border p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Resume Form</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            placeholder="Personal name"
            {...register('personal.name')}
          />
          <Input
            placeholder="Personal title"
            {...register('personal.title')}
          />
          <Input
            placeholder="Phone"
            {...register('contact.phone')}
          />
          <Input
            placeholder="Email"
            {...register('contact.email')}
          />
          <Input
            placeholder="LinkedIn URL"
            {...register('contact.linkedInUrl')}
          />
          <Input
            placeholder="Portfolio URL"
            {...register('contact.portfolioUrl')}
          />
          <Input
            placeholder="Location"
            {...register('contact.location')}
          />
        </div>

        <Textarea
          rows={4}
          placeholder="Summary"
          {...register('summary')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChecklistSection
          title="Education Checklist"
          items={educationItems}
          selected={selectedEducation ?? []}
          loading={isEducationsLoading}
          onToggle={(id, checked) => toggleChecklistId('education', id, checked)}
        />

        <ChecklistSection
          title="Experience Checklist (Projects API)"
          items={projectItems}
          selected={selectedExperience ?? []}
          loading={isProjectsLoading}
          onToggle={(id, checked) => toggleChecklistId('experience', id, checked)}
        />

        <ChecklistSection
          title="Personal Projects Checklist (Projects API)"
          items={projectItems}
          selected={selectedPersonalProjects ?? []}
          loading={isProjectsLoading}
          onToggle={(id, checked) =>
            toggleChecklistId('personalProjects', id, checked)
          }
        />

        <ChecklistSection
          title="Additional Training Checklist"
          items={trainingItems}
          selected={selectedAdditionalTraining ?? []}
          loading={isTrainingsLoading}
          onToggle={(id, checked) =>
            toggleChecklistId('additionalTraining', id, checked)
          }
        />

        <ChecklistSection
          title="Technologies Checklist (Skills API)"
          items={technologyItems}
          selected={selectedTechnologies ?? []}
          loading={isSkillsLoading}
          onToggle={(id, checked) => toggleChecklistId('technologies', id, checked)}
        />

        <ChecklistSection
          title="Soft Skills Checklist"
          items={softSkillItems}
          selected={selectedSoftSkills ?? []}
          loading={isSoftSkillsLoading}
          onToggle={(id, checked) => toggleChecklistId('softSkills', id, checked)}
        />

        <ChecklistSection
          title="Languages Checklist"
          items={languageItems}
          selected={selectedLanguages ?? []}
          loading={isLanguagesLoading}
          onToggle={(id, checked) => toggleChecklistId('languages', id, checked)}
        />

        <ChecklistSection
          title="Certifications Checklist"
          items={certificationItems}
          selected={selectedCertifications ?? []}
          loading={isCertificationsLoading}
          onToggle={(id, checked) => toggleChecklistId('certifications', id, checked)}
        />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting || isLoadingDefault}
        >
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
