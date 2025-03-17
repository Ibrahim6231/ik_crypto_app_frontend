import { lazy } from 'react';
const HomePage = lazy(() => import("../pages/user/home/Home"));
const WalletPage = lazy(() => import("../pages/user/Wallet/Wallet"));


const UserRoutes = [
  {
    path: "/home",
    component: HomePage,
    name: "chatHomePage",
  },
  {
    path: "/wallet",
    component: WalletPage,
    name: "walletPage",
  }
]

export default UserRoutes;
