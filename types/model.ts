export type PermissionD = {
  allow_create_engine: boolean;
  allow_fine_tuning: boolean;
  allow_logprobs: boolean;
  allow_sampling: boolean;
  allow_search_indices: boolean;
  allow_view: boolean;
  created: number;
  group: null;
  id: string;
  is_blocking: boolean;
  object: string;
  organization: string;
};

export type ModelItemD = {
  created: number;
  id: string;
  object: string;
  owned_by: string;
  parent: any;
  permission: PermissionD[];
  root: string;
};
