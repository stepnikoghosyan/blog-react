import { Navigate } from 'react-router-dom';

// components
import { Auth } from "./modules/auth/components/auth/Auth";
import { Posts } from "./modules/posts/components/posts/posts";
import { Layout } from "./modules/shared/modules/layout/components/layout/layout";

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
        { index: true, element: <Navigate to={ getFullRoute(ROUTES.POSTS) }/> }, // TODO: change index to Home
        { path: `${ ROUTES.POSTS }/*`, element: <Posts/> },
      ],
    },
    { path: '*', element: <Navigate to='/auth/login'/> },
  ];
}
