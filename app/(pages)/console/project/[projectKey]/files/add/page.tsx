'use client';

import {
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  LinearProgress,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Typography,
} from '@mui/joy';
import BackHeader from 'app/(pages)/console/components/BackHeader';
import { appContent } from 'app/(pages)/console/components/variants/app';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';

import Papa from 'papaparse';
import { log } from 'utils/helpers';
import { RiCloseFill } from 'react-icons/ri';
import { jsonl } from 'js-jsonl';
import {
  getProjectFileSignedUrlApi,
  uploadProjectFileApi,
} from 'network/api/project/file';
import { useAuth } from 'context/AuthContext';
import { useApp } from 'context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';

let controller;

export default function FileAdd() {
  const router = useRouter();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [jsonlFile, setJsonlFile] = useState(null);
  const [fileText, setFileText] = useState<any>('');
  const { projectKey } = useApp();
  const { token } = useAuth();
  const [promptCount, setPromptCount] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (jsonlFile) {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          setFileText(reader.result);
        },
        false,
      );

      if (jsonlFile) {
        reader.readAsText(jsonlFile);
      }
    } else {
      setFileText('');
    }

    return () => {};
  }, [jsonlFile]);

  useEffect(() => {
    if (fileText) {
      setPromptCount(jsonl.parse(fileText).length);
    }
  }, [fileText]);

  const onFile = async (e) => {
    if (e.target.files[0]) {
      setJsonlFile(e.target.files[0]);
    }
  };

  const cancelUpload = () => {
    controller?.abort();
  };

  const onUpload = async () => {
    try {
      setUploading(true);
      const res1 = await getProjectFileSignedUrlApi({
        file_name: jsonlFile.name,
        project_key: projectKey,
        token,
      });

      controller = new AbortController();
      const config = {
        signal: controller.signal,
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(percentCompleted);
        },
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      };

      const res2 = await axios.put(res1?.data?.url, jsonlFile, config);

      const res = await uploadProjectFileApi({
        token,
        file_name: res1?.data?.filename,
        original_filename: jsonlFile.name,
        project_key: projectKey,
      });

      log(res);

      if (res.type === 'RXSUCCESS') {
        toast('File uploaded', {
          icon: '✅',
        });
        router.push(`/console/project/${projectKey}/files`);
      }

      setUploading(false);
    } catch (err) {
      setUploading(false);

      console.log('Err', err);
    }
  };

  return (
    <div className="bg-gray-50">
      <div className={appContent()}>
        <BackHeader
          title="Create new file"
          desc="Create new files and upload them to your OpenAI account"
        />

        <Divider />

        <div className="mt-4 mb-8 flex flex-col gap-4 ">
          <div className="left flex-1">
            {jsonlFile ? (
              <div className=" mb-2 flex items-center gap-2  rounded-lg border border-solid border-gray-300 bg-gray-100 p-2 pl-3 ">
                <div className="flex-1 ">{jsonlFile?.name}</div>
                <div>
                  <IconButton
                    sx={{ borderRadius: 120 }}
                    color="danger"
                    onClick={() => {
                      setJsonlFile(null);
                    }}
                  >
                    <RiCloseFill />
                  </IconButton>
                </div>
              </div>
            ) : (
              <Button component="label">
                Upload JSONL file
                <input hidden type="file" onChange={onFile} />
              </Button>
            )}
          </div>

          {jsonlFile && (
            <div className="flex-1">
              <div className="mb-4">
                <span className="text-gray-500">
                  Your total propmpt completion pairs :
                </span>
                <b> {promptCount}</b>
              </div>

              <div className="flex items-center gap-2">
                {uploading && (
                  <CircularProgress determinate value={uploadProgress}>
                    {uploadProgress}%
                  </CircularProgress>
                )}
                <Button size="lg" onClick={onUpload} disabled={uploading}>
                  {uploading ? 'Uploading to OpenAI' : 'Upload file to OpenAI'}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-2">
          <div className="mb-4">
            <Typography level="h4">Data</Typography>
            <Typography color="neutral">Example data vs your data</Typography>
          </div>

          <div className=" mb-4 rounded-lg bg-white  p-4">
            <Typography fontWeight={'lg'} sx={{ mb: 1 }}>
              Example prompt-completion pairs
            </Typography>

            <Typography level="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {`{"prompt": "<prompt text><suffix>", "completion": "<space><ideal generated text><stop sequence>"}
{"prompt": "<prompt text><suffix>", "completion": "<space><ideal generated text><stop sequence>"}
{"prompt": "<prompt text><suffix>", "completion": "<space><ideal generated text><stop sequence>"}
...
`}
            </Typography>
          </div>
          <div className=" rounded-lg bg-white p-4">
            <Typography fontWeight={'lg'} sx={{ mb: 1 }}>
              Your prompt-completion pairs
            </Typography>

            <div>
              <Typography level="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {fileText}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          color="primary"
          sx={{
            maxWidth: 500,
            width: '90%',
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose
            variant="outlined"
            // sx={{
            //   top: 'calc(-1/4 * var(--IconButton-size))',
            //   right: 'calc(-1/4 * var(--IconButton-size))',
            //   boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
            //   borderRadius: '50%',
            //   bgcolor: 'background.body',
            // }}
          />

          <div className="mb-3">
            <Typography fontWeight={'lg'}>Upload CSV</Typography>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <Button variant="soft" size="lg" sx={{ width: '100%' }}>
                Clcik to upload CSV file
              </Button>
            </div>

            <div>
              <LinearProgress
                determinate
                variant="outlined"
                color="neutral"
                size="sm"
                thickness={32}
                value={50}
                sx={{
                  '--LinearProgress-radius': '12px',
                  '--LinearProgress-progressThickness': '24px',
                  boxShadow: 'sm',
                  borderColor: 'black',
                }}
              >
                <Typography
                  level="body3"
                  fontWeight="xl"
                  textColor="common.white"
                  sx={{ mixBlendMode: 'difference' }}
                >
                  UPLOAD.... {`${Math.round(50)}%`}
                </Typography>
              </LinearProgress>
            </div>
          </div>
        </Sheet>
      </Modal>
    </div>
  );
}
