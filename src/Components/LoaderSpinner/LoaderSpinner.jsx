import React from "react";
import Loader from "react-loader-spinner";

export const LoaderSpinner = () => {
  return (
    <div>
      <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
      />
    </div>
  );
};
