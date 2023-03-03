'use client';

import {
  Breadcrumbs,
  Button,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  List,
  ListDivider,
  ListItem,
  ListItemContent,
  Table,
  Typography,
} from '@mui/joy';
import {
  appContent,
  listItem,
  listItems,
} from 'app/(pages)/console/components/variants/app';
import { useApp } from 'context/AppContext';
import { useAuth } from 'context/AuthContext';
import { getFineTuneDetailApi } from 'network/api/project/model';
import Link from 'next/link';
import {
  useRouter,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FiArrowDown, FiChevronLeft } from 'react-icons/fi';
import { FineTuneD, FineTuneItemD } from 'types/fineTune';
import { ModelItemD } from 'types/model';
import { formatDateTime } from 'utils/helpers';
import Events from './Events';
import Result from './Result';
import Training from './Training';

export default function FileTuneDetail(route: any) {
  const router = useRouter();
  const { projectKey } = useApp();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const modelId = route.params?.fineTuneId || '';
  const [fineTune, setFineTune] = useState<FineTuneD>({} as FineTuneD);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await getFineTuneDetailApi({
          token,
          project_key: projectKey,
          id: modelId,
        });
        setLoading(false);

        if (res.type === 'RXSUCCESS') {
          setFineTune(res.data);
        }
      } catch (err) {
        setLoading(false);
        console.log('ERR', err);
      }
    };

    if (token && projectKey && modelId) {
      fetchDetail();
    }
  }, [token, projectKey, modelId]);

  return (
    <div className="bg-gray-50">
      <div className={appContent()}>
        <div>
          <div className="mb-4 flex items-center gap-2">
            <IconButton
              size="md"
              color="neutral"
              onClick={() => {
                router.back();
              }}
            >
              <FiChevronLeft />
            </IconButton>

            <Typography fontWeight={'md'} color={'neutral'}>
              Fine-tune Details
            </Typography>
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <div>
            <Typography level="h5" fontWeight={'md'}>
              {fineTune.fine_tuned_model}
            </Typography>
            <Typography>{fineTune.id}</Typography>
          </div>
          <div>
            <Chip size="sm" color="success" onClick={function () {}}>
              {fineTune.status}
            </Chip>
          </div>
        </div>

        <div className="mb-8 flex gap-4 ">
          <div className="flex-1 rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-2">
              <Typography level="h6" fontWeight={'lg'}>
                Details
              </Typography>
              <Typography color="neutral" level="body2">
                See your fine-tune details below
              </Typography>
            </div>
            {/* LIST START  */}
            <Table
              aria-label="basic table"
              sx={{
                'tr > td:first-child': {
                  fontWeight: 'bold',
                },
              }}
            >
              <tbody>
                <tr>
                  <td>Base Model</td>
                  <td>{fineTune.model}</td>
                </tr>
                <tr>
                  <td>Fine-tuned model</td>
                  <td>{fineTune.fine_tuned_model}</td>
                </tr>
                <tr>
                  <td>Created at</td>
                  <td>{formatDateTime(fineTune.created_at)}</td>
                </tr>
                <tr>
                  <td>Updated at</td>
                  <td>{formatDateTime(fineTune.updated_at)}</td>
                </tr>
                <tr>
                  <td>Nr. of epochs</td>
                  <td>{fineTune.hyperparams?.n_epochs}</td>
                </tr>
                <tr>
                  <td>Batch size</td>
                  <td>{fineTune.hyperparams?.batch_size}</td>
                </tr>
                <tr>
                  <td>Prompt loss weight</td>
                  <td>{fineTune.hyperparams?.prompt_loss_weight}</td>
                </tr>
                <tr>
                  <td>Learning rate multiplier</td>
                  <td>{fineTune.hyperparams?.learning_rate_multiplier}</td>
                </tr>
              </tbody>
            </Table>

            {/* LIST END  */}
          </div>

          <div className="flex-1">
            <Events events={fineTune.events} />
          </div>
        </div>

        {/* DATASTART  */}

        <Training trainingFiles={fineTune.training_files} />
        <Result resultFiles={fineTune.result_files} />
      </div>
    </div>
  );
}
