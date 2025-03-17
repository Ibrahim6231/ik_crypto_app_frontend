import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import UnprotectedRoutes from "./UnprotectedRoutes";
import Loader from "../components/loader/Loader";
import { RouteInterface } from "../interfaces/RouteInterface";
import UserRoutes from "./UserRoutes";
import { useAppSelector } from "../app/reduxHooks";
import { RootState } from "../app/store";
import Login from "../pages/auth/login/Login";


const AuthGuard = ({ children, }: { children: React.ReactElement }) => {
  const userState = useAppSelector((state: RootState) => state.userState);
  const { isLoggedIn } = userState;

  if (!isLoggedIn) {
    return <Login />
  } else {
    return children;
  }
};

const AppRoutes: React.FunctionComponent = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          {UnprotectedRoutes.map((route: RouteInterface, index: number) => {
            return (
              <Route
                key={index}
                path={`${route.path}`}
                element={<route.component />}
              />
            );
          })}
          {UserRoutes.map((route: RouteInterface, index: number) => {
            return (
              <Route
                key={index}
                path={`${route.path}`}
                element={
                  <AuthGuard>
                    <route.component />
                  </AuthGuard>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
