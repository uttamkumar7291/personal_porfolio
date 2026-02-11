
export type Page = 'home' | 'about' | 'projects' | 'login' | 'dashboard';

export interface Skill {
  name: string;
  level: number;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}
