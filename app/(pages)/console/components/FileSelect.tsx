'use client';

import { Autocomplete, AutocompleteProps } from '@mui/joy';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import { useApp } from 'context/AppContext';
import { useAuth } from 'context/AuthContext';
import { getFilesApi } from 'network/api/project/file';
import { getAllModelsApi } from 'network/api/project/model';
import React, { useCallback, useEffect, useState } from 'react';
import { ProjectFileItemD } from 'types/model';
import { ProjectFileItemD } from 'types/project';
import { useDebouncedCallback } from 'use-debounce';
import { log } from 'utils/helpers';

export default function FileSelect({
  value,
  onLoadStart,
  onLoad,
  onChange,
  autoSet = true,
  name,
}: {
  onLoadStart?: () => any;
  onLoad?: (d: ProjectFileItemD) => any;
  value: ProjectFileItemD;
  onChange: (d: ProjectFileItemD) => any;
  autoSet?: boolean;
  name?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(value);
  const [files, setFiles] = useState<ProjectFileItemD[]>([]);

  const [search, setSearch] = useState('');

  const { token } = useAuth();

  const { projectKey } = useApp();

  const fetchFile = useCallback(async () => {
    let active = true;

    if (!token || !projectKey) {
      return;
    }

    try {
      setLoading(true);
      const res = await {
        limit: 10,
        page: 1,
        token,
        search,
      };
      setLoading(false);

      if (active) {
        const res = await getFilesApi({
          limit: 10,
          page: 1,
          project_key: projectKey,
          search,
          token,
        });

        if (res.type === 'RXSUCCESS') {
          if (autoSet) {
            setFile(res.data[0]);
          }
          setFiles(res.data);
        }
      }
    } catch (err) {
      setLoading(false);
      console.log('Err', err);
    }
    return () => {
      active = false;
    };
  }, [search, token, projectKey]);

  useEffect(() => {
    fetchFile();
  }, [fetchFile]);

  useEffect(() => {
    setFile(value);
  }, [value]);

  useEffect(() => {
    if (loading && onLoadStart) {
      onLoadStart();
    }
  }, [loading]);

  useEffect(() => {
    if (file?.id) {
      onChange(file);
    }
  }, [file]);

  // const delaySearch = useDebouncedCallback(async (value) => {
  //   setSearch(value);
  // }, 300);

  // const onOrgChange = (e) => {
  //   e.target?.value && delaySearch(e.target.value);
  // };

  return (
    <div>
      <Autocomplete
        size="sm"
        multiple={false}
        name={name}
        options={files}
        placeholder="Select file"
        value={file}
        onChange={(_, val: ProjectFileItemD) => {
          setFile(val);
        }}
        loading={loading}
        // onInputChange={onOrgChange}
        getOptionLabel={(option: ProjectFileItemD) => {
          return option.id;
        }}
        // renderOption={(props, option) => {
        //   return (
        //     <AutocompleteOption {...props}>
        //       <div className="flex flex-col gap-2 py-2">
        //         <div>{option.id}</div>
        //       </div>
        //     </AutocompleteOption>
        //   );
        // }}
      />
    </div>
  );
}
