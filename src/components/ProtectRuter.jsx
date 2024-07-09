import React, { Children } from "react";
import { Navigate } from "react-router-dom";

function ProtectRuter({ user, children }) {
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectRuter;
