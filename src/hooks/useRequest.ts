/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from 'swr';
import { api } from '../services/api';
import { AxiosRequestConfig } from 'axios';

export default function useRequest<Data = any, Error = any>(
  request: string,
  config: AxiosRequestConfig
) {
  const { data: response, error } = useSWR<Data, Error>(request, async () => {
    const { data } = await api(request, config);
    return data;
  });

  return {
    response,
    error
  };
}
