import React from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <ClipLoader color="#00BFFF" size={50} loading = {true} />
    </div>
  );
};

export default LoadingSpinner;