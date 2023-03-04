export type ProjectItemD = {
  api_key: string;
  app_id: string;
  createdAt: string;
  id: number;
  name: string;
  organization: { name: string; user_id: number };
  organization_id: number;
  user_id: number;
  project_key: string;
  type: ProjectTypeD;
};

export type ProjectTypeD = 'basic' | 'advance';

export type ProjectFileItemD = {
  bytes: number;
  created_at: number;
  filename: string;
  id: string;
  object: string;
  purpose: string;
  status: string;
  status_details: any;
};
