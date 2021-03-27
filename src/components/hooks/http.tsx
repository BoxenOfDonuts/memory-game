import { useEffect, useState } from 'react';


export const useHttp= (url: string, dependencies: []): [boolean, null | {data: any[]}] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchData, setFetchedData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then((data) => {
        setFetchedData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, dependencies);

  return [isLoading, fetchData];
};
