export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'small' | 'medium' | 'large' | 'personal';
  image: string;
  images?: { id: string; url: string; name: string }[];
  published?: boolean;
  sortOrder?: number;
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
