import { Navigate } from 'react-router-dom';

// components
import { Auth } from "./modules/auth/components/auth/Auth";
import { Layout } from "./modules/shared/modules/layout/components/layout/layout";
import { Home } from "./modules/home/components/home/home";
import { Posts } from "./modules/posts/components/posts/posts";

// constants
import { ROUTES } from "./constants/routes.constant";

// utils
import { getFullRoute } from "./utils/get-full-route.helper";

export function appRouting() {
  return [
    { path: `${ ROUTES.AUTH }/*`, element: <Auth/> },
    {
      path: '',
      element: <Layout/>,
      children: [
        { index: true, element: <Navigate to={ getFullRoute(ROUTES.HOME) }/> },
        { path: ROUTES.HOME, element: <Home/> },
        { path: `${ ROUTES.POSTS }/*`, element: <Posts/> },
      ],
    },
    { path: '*', element: <Navigate to='/auth/login'/> },
  ];
}
