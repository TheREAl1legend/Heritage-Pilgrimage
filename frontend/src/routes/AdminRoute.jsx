import React from "react";

import {
  Navigate,
} from "react-router-dom";

const AdminRoute = ({
  children,
}) => {
  const userInfo =
    JSON.parse(
      localStorage.getItem(
        "userInfo"
      )
    );

  /* =========================
     NOT LOGGED IN
  ========================= */

  if (!userInfo) {
    return (
      <Navigate
        to="/login"
      />
    );
  }

  /* =========================
     NOT ADMIN
  ========================= */

  if (
    userInfo.role !==
    "admin"
  ) {
    return (
      <Navigate to="/" />
    );
  }

  /* =========================
     ADMIN ACCESS
  ========================= */

  return children;
};

export default AdminRoute;