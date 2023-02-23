'use client';

import { ClickAwayListener } from '@mui/base';
import { Button, FormControl, FormLabel, Input, Typography } from '@mui/joy';
import BackHeader from 'app/components/BackHeader';
import { appContent } from 'app/components/variants/app';
import Link from 'next/link';
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

export default function FaqPluginPage() {
  const [colorOpen, setColorOpen] = useState(false);
  const [bgColor, setBgColor] = useState('#ff0000');

  return (
    <div>
      <div className={appContent()}>
        <BackHeader title="FAQ Plugin" />

        {/* <div>
          <Typography level="h6">Manage FAQ plugin</Typography>
        </div> */}

        <div className="grid grid-cols-2 gap-6">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FormControl size="sm">
              <FormLabel>Name</FormLabel>
              <Input />
            </FormControl>

            <ClickAwayListener onClickAway={() => setColorOpen(false)}>
              <FormControl size="sm">
                <FormLabel>Color</FormLabel>

                <div
                  className="relative h-10 rounded-lg"
                  style={{ backgroundColor: bgColor }}
                  onClick={() => {
                    setColorOpen((s) => !s);
                  }}
                ></div>

                {colorOpen && (
                  <SketchPicker
                    color={bgColor}
                    className="absolute top-[100%] z-20"
                    onChange={(e) => {
                      setBgColor(e.hex);
                      // console.log('EEE', e);
                    }}
                  />
                )}
              </FormControl>
            </ClickAwayListener>

            <Button sx={{ alignSelf: 'flex-start' }}>Update</Button>
          </form>

          <div>
            <div className="h-6 border-dashed border-gray-300 bg-gray-100"></div>
          </div>
        </div>

        <Link
          className="mt-8 flex no-underline"
          href={'/plugins/faq'}
          target="_blank"
        >
          <Button fullWidth size="lg">
            PREVIEW
          </Button>
        </Link>
      </div>
    </div>
  );
}
