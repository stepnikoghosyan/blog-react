import { Navigate } from 'react-router-dom';

// routing
import { Auth } from "./modules/auth/components/auth/Auth";

// constants
import { ROUTES } from "./constants/routes.constant";

export function appRouting() {
  return [
    { path: `${ROUTES.AUTH}/*`, element: <Auth/> },
    { path: '*', element: <Navigate to='/auth/login'/> },
  ];
}
