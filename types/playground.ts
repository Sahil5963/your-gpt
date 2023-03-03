export type PlaygroundMessageItemD = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: PlaygroundMessageChoiceD[];
  usage: PlaygroundMessageUsageD;
};

export type PlaygroundMessageChoiceD = {
  text: string;
  index: number;
  logprobs: null;
  finish_reason: string;
};

export type PlaygroundMessageUsageD = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};
