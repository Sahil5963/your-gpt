import { useAuth } from 'context/AuthContext';
import { getProjectsApi } from 'network/api/project';
import { getOrganisationApi } from 'network/api/organisation';
import { useEffect, useState } from 'react';
import { SortD } from 'types';
import { useDebounce } from 'use-debounce';

type ApiType = 'org' | 'member' | 'project';

export function useListingApi({
  type,
  sort,
  search,
  page,
  limit,
}: {
  type: ApiType;
  search: string;
  sort: SortD;
  page: number;
  limit: number;
}) {
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [delaySearch] = useDebounce(search, 300);

  //   useEffect(() => {

  //   }, [])

  const { token } = useAuth();

  useEffect(() => {
    const fe = async () => {
      try {
        let res: any;

        const dat = {
          limit,
          page,
          search: delaySearch,
          token,
          orderBy: sort,
        };
        setLoading(true);
        switch (type) {
          case 'project':
            res = await getProjectsApi(dat);
            break;
          case 'org':
            res = await getOrganisationApi(dat);
            break;
          case 'project':
            res = await getProjectsApi(dat);
            break;
          default:
        }

        setLoading(false);

        if (res.type === 'RXSUCCESS') {
          setData(res.data);
          setTotal(res.total);
        } else {
          setData([]);
          setTotal(0);
        }
      } catch (err) {
        setLoading(false);
        console.log('ERR', err);
      }
    };

    if (token) {
      fe();
    }
  }, [page, limit, delaySearch, limit, token, sort]);

  return {
    apiError,
    loading,
    data,
    total,
    setTotal,
    setData,
  };
}
