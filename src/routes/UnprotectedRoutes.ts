import { lazy } from "react";

const LoginPage = lazy(() => import("../pages/auth/login/Login"));
const RegisterPage = lazy(() => import("../pages/auth/register/Register"));
const NotFoundPage = lazy(() => import("../pages/user/pageNotFound/PageNotFound"));


const UnprotectedRoutes: any = [
  {
    path: "/",
    component: LoginPage,
    name: "login",
  },
  {
    path: "/register",
    component: RegisterPage,
    name: "Register",
  },
  {
    path: "*",
    component: NotFoundPage,
    name: "PageNotFound",
  },
];

export default UnprotectedRoutes;
