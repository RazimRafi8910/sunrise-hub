import { useEffect, useState } from 'react';
import { getBackendURL } from '../lib/utils';


const backendUrl = getBackendURL()

function useFetch(url:string | null, options:RequestInit | null) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    async function getFetch() {
      if (!url || !options) {
        return;
      }
      try {
        const response = await fetch(`${backendUrl}${url}`, {
          method: "GET",
          headers: {
            'Content-type': 'application/json',
          },
          credentials: "include",
          ...options
        });
        const result = await response.json();

        if (!response.ok || result?.success == false) {
          throw new Error(result.message);
        }

        setData(result.data)
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    getFetch();
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

  return { data, loading, error, getFetch };
}
