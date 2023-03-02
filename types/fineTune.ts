export type FineTuneItemD = {
  object: string;
  id: string;
  hyperparams: HyperparamsD;
  organization_id: string;
  model: string;
  training_files: TrainingFileD[];
  validation_files: any[];
  result_files: ResultFileD[];
  created_at: number;
  updated_at: number;
  status: string;
  fine_tuned_model: string;
};

export type FineTuneD = FineTuneItemD & {
  events?: FineTuneEventD[];
};

export type FineTuneEventD = {
  object: string;
  level: string;
  message: string;
  created_at: number;
};

export type HyperparamsD = {
  n_epochs: number;
  batch_size: number;
  prompt_loss_weight: number;
  learning_rate_multiplier: number;
};

export type TrainingFileD = {
  object: string;
  id: string;
  purpose: string;
  filename: string;
  bytes: number;
  created_at: number;
  status: string;
  status_details: null;
};

export type ResultFileD = {
  object: string;
  id: string;
  purpose: string;
  filename: string;
  bytes: number;
  created_at: number;
  status: string;
  status_details: any;
};
