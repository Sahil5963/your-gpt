'use client';

import { Autocomplete, AutocompleteProps } from '@mui/joy';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import { useApp } from 'context/AppContext';
import { useAuth } from 'context/AuthContext';
import { getAllModelsApi, getFineTunesApi } from 'network/api/project/model';
import React, { useCallback, useEffect, useState } from 'react';
import { ModelItemD } from 'types/model';
import { useDebouncedCallback } from 'use-debounce';
import { log } from 'utils/helpers';

export default function ModelSelect({
  value,
  onLoadStart,
  onLoad,
  onChange,
}: {
  onLoadStart?: () => any;
  onLoad?: (d: ModelItemD) => any;
  value: ModelItemD;
  onChange: (d: ModelItemD) => any;
}) {
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(value);
  const [models, setModels] = useState<ModelItemD[]>([]);

  const [search, setSearch] = useState('');

  const { token } = useAuth();

  const { projectKey } = useApp();

  const fetchModel = useCallback(async () => {
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
        const res = await getAllModelsApi({
          limit: 10,
          page: 1,
          project_key: projectKey,
          search,
          token,
        });

        if (res.type === 'RXSUCCESS') {
          setModel(res.data[0]);
          setModels(res.data);
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
    fetchModel();
  }, [fetchModel]);

  useEffect(() => {
    setModel(value);
  }, [value]);

  useEffect(() => {
    if (loading && onLoadStart) {
      onLoadStart();
    }
  }, [loading]);

  useEffect(() => {
    if (model?.id) {
      onChange(model);
    }
  }, [model]);

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
        name="model"
        options={models}
        placeholder="Select model"
        value={model}
        onChange={(_, val: ModelItemD) => {
          setModel(val);
        }}
        loading={loading}
        // onInputChange={onOrgChange}
        getOptionLabel={(option: ModelItemD) => {
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
