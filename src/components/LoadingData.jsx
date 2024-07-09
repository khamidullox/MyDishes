import React from "react";

function LoadingData({ size }) {
  return (
    <div className="flex items-center justify-center mt-52">
      {" "}
      <span
        className={`loading loading-dots loading-lg  text-center ${size}`}
      ></span>
    </div>
  );
}

export default LoadingData;
