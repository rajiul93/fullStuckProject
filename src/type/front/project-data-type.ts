export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'small' | 'medium' | 'large' | 'personal';
  image: string;
  githubFrontendLink?: string;
  githubBackendLink?: string;
  clientLink?: string;
  serverLink?: string;
  tags: string[];
  features: {
    title: string;
    description: string;
  }[];
}
