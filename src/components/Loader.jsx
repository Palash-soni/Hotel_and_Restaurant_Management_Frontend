import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loader = ({ vis }) => {
  return (
    <>
      <div
        className={`h-screen w-screen fixed top-0 left-0 bg-[rgba(255,255,255,0.5)] flex items-center justify-center z-99 ${vis?"flex":"hidden"}`}
      >
        <InfinitySpin width="200" color="#5a0f0f" />
      </div>
    </>
  );
};

export default Loader;
