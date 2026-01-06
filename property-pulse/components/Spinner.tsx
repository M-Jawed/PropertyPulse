import React from "react";
import { ClipLoader } from "react-spinners";
import { CSSProperties } from "react";

const override: CSSProperties = {
  color: "blue",
  margin: "100px auto",
};

const Spinner = ({ loading }: { loading: boolean }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <ClipLoader
        loading={loading}
        color="blue"
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
