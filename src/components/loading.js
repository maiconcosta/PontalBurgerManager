import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import GridLoader from 'react-spinners/GridLoader';

const Loading = () => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <div className="loader">
        <GridLoader size={15} color="#999" loading />
      </div>
    )
  );
};

export default Loading;
