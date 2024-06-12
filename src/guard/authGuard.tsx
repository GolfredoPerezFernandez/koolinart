import { PublicRoutes } from "@/models";
import { Outlet, Navigate } from "react-router-dom";
import { useBoundStore } from "@/store/index";
import { shallow } from "zustand/shallow";

export const AuthGuard = () => {
  const { Authenticated } = useBoundStore((state: any) => state, shallow);
  return Authenticated ? (
    <Outlet />
  ) : (
    <Navigate replace to={PublicRoutes.Home} />
  );
};

export default AuthGuard;
