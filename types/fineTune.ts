export type FineTuneItemD = {
  object: string;
  id: string;
  hyperparams: HyperparamsD;
  organization_id: string;
  model: string;
  training_files: TrainingFileD[];
  validation_files: any[];
  result_files: File[];
  created_at: number;
  updated_at: number;
  status: string;
  fine_tuned_model: string;
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
