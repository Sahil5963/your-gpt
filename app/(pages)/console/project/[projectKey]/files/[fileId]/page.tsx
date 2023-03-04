'use client';

import {
  Breadcrumbs,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListDivider,
  ListItem,
  ListItemContent,
  Typography,
} from '@mui/joy';
import { appContent } from 'app/(pages)/console/components/variants/app';
import { useApp } from 'context/AppContext';
import { useAuth } from 'context/AuthContext';
import { jsonl } from 'js-jsonl';
import { getProjectsApi } from 'network/api/project';
import { getFileContentApi, getFileDetailApi } from 'network/api/project/file';
import Link from 'next/link';
import {
  useRouter,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FiArrowDown, FiChevronLeft } from 'react-icons/fi';
import { ProjectFileItemD } from 'types/project';
import { log } from 'utils/helpers';
import Data from './Data';

export default function FileDetail(route) {
  const { projectKey } = useApp();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [fileContent, setFileContent] = useState<any>(null);

  const fileId = route.params?.fileId || '';

  const [fileDetail, setFileDetail] = useState<ProjectFileItemD>(
    {} as ProjectFileItemD,
  );

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await getFileDetailApi({
          token,
          file_id: fileId,
          project_key: projectKey,
        });
        setLoading(false);

        if (res.type === 'RXSUCCESS') {
          setFileDetail(res.data);
        }
      } catch (err) {
        setLoading(false);
        console.log('ERR', err);
      }
    };

    if (token && projectKey && fileId) {
      fetchDetail();
    }
  }, [token, projectKey, fileId]);

  /**
   * File Content
   */

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const res = await getFileContentApi({
          token,
          file_id: fileId,
          project_key: projectKey,
        });

        log('kkk', res);

        if (res.type === 'RXSUCCESS') {
          setFileContent(res.data);
        }
      } catch (err) {
        console.log('Err', err);
      }
    };

    if (token && projectKey && fileId) {
      fetchFileContent();
    }
  }, [token, projectKey, fileId]);

  if (fileContent) {
    console.log(jsonl.parse(fileContent));
  }

  return (
    <div className="bg-gray-50">
      <div className={appContent()}>
        {loading ? (
          <div className="flex h-24 items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <>
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
                  File Details
                </Typography>
              </div>
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <div>
                <Typography level="h5" fontWeight={'md'}>
                  {fileDetail.filename}
                </Typography>
                <Typography>{fileDetail.id}</Typography>
              </div>
              <div>
                <Chip size="sm" color="neutral" onClick={function () {}}>
                  {fileDetail.status}
                </Chip>
              </div>
            </div>

            <div className="mb-8 flex gap-4 ">
              <div className="flex-1 rounded-lg bg-white p-6 shadow-sm">
                {/* LIST START  */}
                <div className=" flex flex-col gap-2">
                  <div className="flex justify-between gap-2">
                    <Typography fontWeight={'md'}>Purpose : </Typography>
                    <Typography fontWeight={'sm'}>
                      {fileDetail.purpose}
                    </Typography>
                  </div>
                  <Divider />
                  <div className="flex justify-between gap-2">
                    <Typography fontWeight={'md'}>Bytes : </Typography>
                    <Typography fontWeight={'sm'}>
                      {fileDetail.bytes}
                    </Typography>
                  </div>
                  <Divider />
                  <div className="flex justify-between gap-2">
                    <Typography fontWeight={'md'}>Object : </Typography>
                    <Typography fontWeight={'sm'}>
                      {fileDetail.object}
                    </Typography>
                  </div>
                  <Divider />
                  <div className="flex justify-between gap-2">
                    <Typography fontWeight={'md'}>Created at</Typography>
                    <Typography fontWeight={'sm'}>
                      {new Date(fileDetail.created_at * 1000).toLocaleString()}
                    </Typography>
                  </div>
                </div>

                {/* LIST END  */}
              </div>

              <div className="flex flex-1 flex-col rounded-lg bg-white p-6 shadow-sm">
                <Typography level="body1" fontWeight={'lg'}>
                  Download File
                </Typography>

                <div className="mt-4 mb-3 flex gap-8">
                  <Checkbox label="CSV" size="md" defaultChecked />

                  <Checkbox label="JSON" size="md" defaultChecked />
                </div>

                <Button size="md" sx={{ marginTop: 'auto' }}>
                  Download
                </Button>
              </div>
            </div>

            {/* DATASTART  */}

            {/* <Data /> */}

            <div className="bg-white p-4 shadow-sm">
              <div className="mb-4">
                <Typography level="h6">Raw JSON</Typography>
              </div>

              <div className="text-sm text-gray-500">{fileContent}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
