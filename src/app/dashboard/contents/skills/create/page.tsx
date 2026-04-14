import { redirect } from 'next/navigation';

export default function SkillsCreateRedirectPage() {
  redirect('/dashboard/contents/skills');
}
