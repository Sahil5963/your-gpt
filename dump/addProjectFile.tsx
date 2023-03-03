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
import { appContent } from 'app/(pages)/console/components/variants/app';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';

export default function FileAdd() {
  const router = useRouter();
  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <div className="bg-gray-50">
      <div className={appContent()}>
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
            Add file
          </Typography>
        </div>

        <div className="mb-6">
          <Typography level="h5">Create new file</Typography>
          <Typography color="neutral" level="body2">
            Create new files and upload them to your OpenAI account
          </Typography>
        </div>

        <div className="mb-8 flex  gap-4">
          <div className="flex flex-1 flex-col items-start gap-4">
            <Checkbox label="Add suffix" />
            <Checkbox label="Add space before completion" />
            <Checkbox label="Add stop sequence" />
            <Button onClick={() => setUploadOpen(true)}>Upload CSV</Button>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <div>
              <Typography fontWeight={'lg'}>
                prompt/completion pairs : 12
              </Typography>
            </div>

            <div className="flex flex-col items-start gap-3">
              <FormControl disabled>
                <FormLabel>Enter file name</FormLabel>
                <Input placeholder="Placeholder" />
              </FormControl>

              <Button disabled>Upload file to Open AI</Button>
            </div>
          </div>
        </div>

        <Divider />

        <div className="mt-2">
          <div className="mb-4">
            <Typography level="h4">Data</Typography>
            <Typography color="neutral">Example data vs your data</Typography>
          </div>

          <div className=" mb-4 rounded-lg bg-white  p-4">
            <Typography fontWeight={'lg'} sx={{ mb: 1 }}>
              Example prompt-completion pairs
            </Typography>

            <Typography level="body2">
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
