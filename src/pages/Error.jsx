import React from "react";
import { useRouteError } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../animation/kiss-of-the-heart";
import { Link } from "react-router-dom";
function Error() {
  let error = useRouteError();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  if (error.status == 404) {
    return (
      <div className=" flex items-center justify-center h-[100vh] place-items-center object-cover flex-col">
        <div className="lg:size-96 md:size-72 size-48 ">
          {" "}
          <Lottie options={defaultOptions} />
        </div>
        <h1 className="text-3xl font-bold">Page not found</h1>
        <Link className="btn btn-info mt-5" to="/">
          Home
        </Link>
      </div>
    );
  }
  return (
    <h1 className="h-[100vh] flex items-center justify-center place-items-center text-3xl font-bold">
      Something went wrong...
    </h1>
  );
}

export default Error;
