import React, {useEffect, useState} from 'react';

const useHttp = (url, dependencies) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ fetchData, setFetchedData ] = useState(null);


    useEffect(() => {
        setIsLoading(true);

        fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?cardsetocg=Vol.1')
        .then(response => {
          if(!response.ok) {
            throw new Error('Failed to fetch.');
          }
          return response.json();
        })
        .then(data => {
          setFetchedData(data);
          setIsLoading(false);
        })
        .catch(error => {
            console.log(error);
            setIsLoading(false);
        })
    }, dependencies);

    return [ isLoading, fetchData ]
  }

  export default useHttp