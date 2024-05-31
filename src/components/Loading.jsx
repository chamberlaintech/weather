import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="loading">
      <BeatLoader color="#FEFCFB" size={20} />
    </div>
  );
};

export default Loading;
