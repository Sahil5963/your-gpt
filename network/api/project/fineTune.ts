import { post } from 'network';

export const getFineTunesApi = async ({
  token,
  ...raw
}: {
  token: string;
  limit: number;
  page: number;
  search: string;
  project_key: string;
}) => {
  return post({
    route: '/api/v1/basictuning/getFineTunes',
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  });
};
export const getFineTuneDetailApi = async ({
  token,
  ...raw
}: {
  token: string;
  project_key: string;
  id: string;
}) => {
  return post({
    route: '/api/v1/basictuning/getFineTuneDetail',
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  });
};

export type CreateFineTuneApiParams = {
  token: string;
  project_key: string;
  training_file: string;
  validation_file?: string;
  model: string;
  suffix: string;

  //Advance
  n_epochs?: string;
  batch_size: string;
  learning_rate_multiplier?: string;
  prompt_loss_weight?: string;
  classification_n_classes?: string;
  classification_positive_class?: string;
  classification_betas?: string;
  compute_classification_metrics?: boolean;
};
export const createFineTuneApi = async ({
  token,
  ...raw
}: CreateFineTuneApiParams) => {
  return post({
    route: '/api/v1/basictuning/createFineTune',
    data: JSON.stringify(raw),
    config: {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  });
};
