'use client';

import { ClickAwayListener } from '@mui/base';
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Option,
  Select,
  Sheet,
  Switch,
  Tooltip,
  Typography,
} from '@mui/joy';
import BackHeader from 'app/(pages)/console/components/BackHeader';
import FileSelect from 'app/(pages)/console/components/FileSelect';
import ModelSelect from 'app/(pages)/console/components/ModelSelect';
import { appContent } from 'app/(pages)/console/components/variants/app';
import { useApp } from 'context/AppContext';
import { useAuth } from 'context/AuthContext';
import { createFineTuneApi } from 'network/api/project/fineTune';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';
import { FaQuestion } from 'react-icons/fa';
import { FiChevronDown, FiChevronLeft } from 'react-icons/fi';
import { ModelItemD } from 'types/model';
import { ProjectFileItemD } from 'types/project';
import { log } from 'utils/helpers';

const rowsC = 'gap-6';

enum Fields {
  name = 'name',
  trainingFile = 'training_file',
  validationFile = 'validation_file',
  model = 'model',
  suffix = 'suffix',
  epochs = 'n_epochs',
  batchSize = 'batch_size',
  learning = 'learning_rate_multiplier',
  loss = 'prompt_loss_weight',
  metric = 'compute_classification_metrics',
  nClasses = 'classification_n_classes',
  positiveClass = 'classification_positive_class',
  minBeta = 'minBeta',
  maxBeta = 'maxBeta',
  betas = 'classification_betas',
}

export default function FineTuneAdd() {
  const router = useRouter();
  const { projectKey } = useApp();
  const { token } = useAuth();
  const [trainingFile, setTrainingFile] = useState<ProjectFileItemD | null>(
    null,
  );
  const [validationFile, setValidationFile] = useState<ProjectFileItemD | null>(
    null,
  );

  const [model, setModel] = useState<ModelItemD | null>({
    id: 'curie',
  });
  const [advance, setAdvance] = useState(false);

  const [metric, setMetric] = useState(false);
  const [minBeta, setMinBeta] = useState('');
  const [maxBeta, setMaxBeta] = useState('');
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const onSubmit = async (e) => {
    let data1 = {};
    try {
      Array.from(e.target.elements).forEach((i: any) => {
        if (i.name && i.value) {
          data1 = {
            ...data1,
            [i.name]: i.type === 'number' ? Number(i.value) : i.value,
          };
        }
      });

      if (minBeta && maxBeta) {
        data1 = { ...data1, [Fields.betas]: `${minBeta},${maxBeta}` };
      }

      data1 = { ...data1, compute_classification_metrics: metric };

      setLoading(true);

      const res = await createFineTuneApi({
        token,
        project_key: projectKey,
        ...data1,
      });

      setLoading(false);

      if (res.type === 'RXSUCCESS') {
        setSuccess(true);
        router.push(`/console/project/${projectKey}/fine-tunes`);
      }

      log(res);
    } catch (err) {
      setLoading(false);
      setSuccess(false);
      console.log('Err', err);
    }
  };

  return (
    <div className="bg-gray-50">
      <div className={appContent()}>
        <div className="mb-4">
          <BackHeader
            title="Create Fine-tune"
            desc="Create new fine tunes straight to your OpenAI account"
          />
        </div>

        {/* PAPER  */}
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <form
            className={'flex flex-col ' + ' ' + rowsC}
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(e);
            }}
          >
            <FormControl required size="sm">
              <LabelHeader label="Name" />

              <Input name={Fields.name} placeholder="Enter Fine-tune name" />
            </FormControl>
            <div className="grid grid-cols-2 gap-4">
              <FormControl required>
                <LabelHeader
                  label="Training file"
                  info={
                    <div className="flex flex-col gap-2">
                      <p>
                        The ID of an uploaded file that contains training data.
                      </p>

                      <Link href={'#'}>
                        See upload file for how to upload a file.
                      </Link>
                      <p>
                        Your dataset must be formatted as a JSONL file, where
                        each training example is a JSON object with the keys
                        "prompt" and "completion". Additionally, you must upload
                        your file with the purpose fine-tune.
                      </p>
                    </div>
                  }
                />

                <FileSelect
                  value={trainingFile}
                  onChange={(e) => {
                    setTrainingFile(e);
                  }}
                  autoSet={false}
                  name={Fields.trainingFile}
                />
              </FormControl>
              <FormControl>
                <LabelHeader
                  label="Validation file"
                  info={
                    <div className="flex flex-col gap-1">
                      <p>
                        The ID of an uploaded file that contains validation
                        data.
                      </p>
                      <p>
                        If you provide this file, the data is used to generate
                        validation metrics periodically during fine-tuning.
                        These metrics can be viewed in the fine-tuning results
                        file. Your train and validation data should be mutually
                        exclusive.
                      </p>
                      <p>
                        Your dataset must be formatted as a JSONL file, where
                        each validation example is a JSON object with the keys
                        "prompt" and "completion". Additionally, you must upload
                        your file with the purpose fine-tune.
                      </p>
                    </div>
                  }
                />
                <FileSelect
                  value={validationFile}
                  onChange={(e) => {
                    setValidationFile(e);
                  }}
                  name={Fields.validationFile}
                  autoSet={false}
                />
              </FormControl>
            </div>
            <FormControl required>
              <LabelHeader
                label="Select model"
                info={
                  <div>
                    <p>
                      The name of the base model to fine-tune. You can select
                      one of "ada", "babbage", "curie", "davinci", or a
                      fine-tuned model created after 2022-04-21. To learn more
                      about these models, see the Models documentation.
                    </p>
                  </div>
                }
              />
              <ModelSelect
                name={Fields.model}
                value={model}
                onChange={(e) => {
                  setModel(e);
                }}
                autoSet={false}
              />
            </FormControl>
            <FormControl required>
              <LabelHeader label="Suffix" />
              <Input
                name={Fields.suffix}
                placeholder="Enter suffix"
                size="sm"
              />
            </FormControl>

            <div className="rounded-lg bg-gray-100 px-4">
              <div
                onClick={() => setAdvance((s) => !s)}
                className="flex cursor-pointer justify-between py-5 text-black/60 hover:text-black "
              >
                <div className="font-semibold">Advance options</div>
                <FiChevronDown />
              </div>

              {advance && (
                <div className={`flex flex-col pb-4 ${rowsC}`}>
                  <div className="grid grid-cols-4 gap-4">
                    <FormControl>
                      <LabelHeader
                        info={
                          'The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.'
                        }
                        label={'No. of epochs'}
                      />
                      <Input
                        slotProps={{
                          input: {
                            max: 10,
                          },
                        }}
                        defaultValue={4}
                        type={'number'}
                        name={Fields.epochs}
                        size="sm"
                      />
                    </FormControl>
                    <FormControl>
                      <LabelHeader
                        label="Batch size"
                        info={
                          <div className="flex flex-col gap-1">
                            <p>
                              The batch size to use for training. The batch size
                              is the number of training examples used to train a
                              single forward and backward pass.
                            </p>
                            <p>
                              By default, the batch size will be dynamically
                              configured to be ~0.2% of the number of examples
                              in the training set, capped at 256 - in general,
                              we've found that larger batch sizes tend to work
                              better for larger datasets.
                            </p>
                          </div>
                        }
                      />
                      <Input
                        name={Fields.batchSize}
                        type={'number'}
                        size="sm"
                      />
                    </FormControl>
                    <FormControl>
                      <LabelHeader
                        label="Learning rate multiplier"
                        info={
                          <div className="flex flex-col gap-1">
                            <p>
                              The learning rate multiplier to use for training.
                              The fine-tuning learning rate is the original
                              learning rate used for pretraining multiplied by
                              this value.
                            </p>
                            <p>
                              By default, the learning rate multiplier is the
                              0.05, 0.1, or 0.2 depending on final batch_size
                              (larger learning rates tend to perform better with
                              larger batch sizes). We recommend experimenting
                              with values in the range 0.02 to 0.2 to see what
                              produces the best results.
                            </p>
                          </div>
                        }
                      />
                      <Input
                        slotProps={{
                          input: {
                            max: 10,
                          },
                        }}
                        type={'number'}
                        name={Fields.learning}
                        size="sm"
                      />
                    </FormControl>
                    <FormControl>
                      <LabelHeader
                        label="Packet loss weight"
                        info={
                          <div className="flex flex-col gap-1">
                            <p>
                              The weight to use for loss on the prompt tokens.
                              This controls how much the model tries to learn to
                              generate the prompt (as compared to the completion
                              which always has a weight of 1.0), and can add a
                              stabilizing effect to training when completions
                              are short.
                            </p>
                            <p>
                              If prompts are extremely long (relative to
                              completions), it may make sense to reduce this
                              weight so as to avoid over-prioritizing learning
                              the prompt.
                            </p>
                          </div>
                        }
                      />
                      <Input
                        slotProps={{
                          input: {
                            max: 1,
                          },
                        }}
                        defaultValue={0.01}
                        type={'number'}
                        name={Fields.loss}
                        size="sm"
                      />
                    </FormControl>
                  </div>
                  <div>
                    <LabelHeader
                      label="Classification metrics"
                      info={
                        <div className="flex flex-col gap-1">
                          <p>
                            If set, we calculate classification-specific metrics
                            such as accuracy and F-1 score using the validation
                            set at the end of every epoch. These metrics can be
                            viewed in the results file.
                          </p>
                          <p>
                            In order to compute classification metrics, you must
                            provide a validation_file. Additionally, you must
                            specify classification_n_classes for multiclass
                            classification or classification_positive_class for
                            binary classification.
                          </p>
                        </div>
                      }
                    />
                    <Switch
                      checked={metric}
                      onChange={() => setMetric((s) => !s)}
                      sx={{ alignSelf: 'flex-start' }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormControl>
                      <LabelHeader
                        label="Classification n classes"
                        info={
                          <div>
                            The number of classes in a classification task.
                            <br />
                            This parameter is required for multiclass
                            classification.
                          </div>
                        }
                      />
                      <Input name={Fields.nClasses} type={'number'} size="sm" />
                    </FormControl>
                    <FormControl>
                      <LabelHeader
                        label="Classification positive class"
                        info={
                          <div>
                            The positive class in binary classification.
                            <br />
                            This parameter is needed to generate precision,
                            recall, and F1 metrics when doing binary
                            classification.
                          </div>
                        }
                      />
                      <Input
                        type={'text'}
                        name={Fields.positiveClass}
                        size="sm"
                      />
                    </FormControl>
                  </div>
                  <div>
                    <LabelHeader
                      label="Classification betas"
                      info={
                        <div>
                          If this is provided, we calculate F-beta scores at the
                          specified beta values. The F-beta score is a
                          generalization of F-1 score. This is only used for
                          binary classification.
                          <br />
                          With a beta of 1 (i.e. the F-1 score), precision and
                          recall are given the same weight. A larger beta score
                          puts more weight on recall and less on precision. A
                          smaller beta score puts more weight on precision and
                          less on recall.
                        </div>
                      }
                    />

                    <div className="flex gap-4">
                      <Input
                        size="sm"
                        value={minBeta}
                        onChange={(e) => setMinBeta(e.target.value)}
                        type={'number'}
                        placeholder="Min"
                      />
                      <Input
                        size="sm"
                        value={maxBeta}
                        onChange={(e) => setMaxBeta(e.target.value)}
                        type={'number'}
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex w-full">
              <Button
                loading={loading}
                color={success ? 'success' : 'primary'}
                type="submit"
                disabled={success}
              >
                Create Fine-tine
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const LabelHeader = ({
  label = '',
  info,
}: {
  label: string;
  info?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-1 flex items-center gap-2">
      <FormLabel>{label}</FormLabel>
      {info && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Tooltip
            arrow
            // open={open}
            variant="outlined"
            placement="bottom-start"
            title={
              <Sheet
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: 400,
                  justifyContent: 'center',
                  p: 1,
                }}
              >
                <Typography
                  textColor={'neutral.500'}
                  level="body2"
                  fontWeight={'sm'}
                >
                  {info}
                </Typography>
              </Sheet>
            }
          >
            <div
              onClick={() => setOpen(true)}
              className="cursor-pointer text-black/30 hover:text-black/60"
            >
              <AiFillInfoCircle size={20} />
            </div>
          </Tooltip>
        </ClickAwayListener>
      )}
    </div>
  );
};
