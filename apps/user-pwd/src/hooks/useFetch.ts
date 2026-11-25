import { useCallback, useEffect, useState } from 'react';
import { getBackendURL } from '../lib/utils';
import type { ApiResponse } from '@sunrise-hub/shared';


const backendUrl = getBackendURL()

export default function useFetch<T>(url:string | null, options:RequestInit | null) {
  const [data, setData] = useState<T | []>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const getInitialFetch = useCallback(
          async (
              requestUrl: string | null = url,
              requestOptions: RequestInit = options ?? {}
          ): Promise<T | null> => {
              if (!requestUrl) return null;

              setLoading(true);
              setError(null);

              try {
                  const headers = new Headers(requestOptions.headers);

                  if (!headers.has("Content-Type")) {
                      headers.set("Content-Type", "application/json");
                  }

                  const response = await fetch(
                      `${backendUrl}${requestUrl}`,
                      {
                          ...requestOptions,
                          headers,
                          credentials: "include",
                      }
                  );

                  const result = await response.json() as ApiResponse<T>;

                  if (!response.ok || !result.success) {
                      const message = !result.success
                          ? result.error.message
                          : "Something went wrong";

                      throw new Error(message);
                  }

                  setData(result.data);
                  return result.data;

              } catch (err) {
                  const message = err instanceof Error
                      ? err.message
                      : "Something went wrong";

                  setError(message);
                  return null;

              } finally {
                  setLoading(false);
              }
          },
          [url, options]
      );

      useEffect(() => {
          if (url && options) {
              getInitialFetch();
          }
      }, []);


  async function getFetch(url :string, method:string = 'GET', options:RequestInit) {
    try {
      const response = await fetch(`${backendUrl}${url}`, {
        method,
        headers: {
          'Content-type': 'application/json'
        },
        ...options
      });

      const result = await response.json();

      if (!response.ok || result?.success == false) {
        setError(result.message);
      }
      setData(result.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, getFetch,setData };
}
