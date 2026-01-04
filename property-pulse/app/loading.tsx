"use client";

import React from "react";
import { ClipLoader } from "react-spinners";
import { CSSProperties } from "react";

const override: CSSProperties = {
  display: "block",
  margin: "100px auto",
};

const LoadingPage = ({ loading }: { loading: boolean }) => {
  return (
    <ClipLoader
      color="blue"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default LoadingPage;
