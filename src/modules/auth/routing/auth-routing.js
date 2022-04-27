import { Navigate } from 'react-router-dom';

// constants
import { ROUTES } from "../../../constants/routes.constant";

// components
import { Login } from "../components/login/Login";
import { Register } from "../components/register/Register";
import { VerifyAccount } from "../components/verify-account/verify-account";

// utils
import { getFullRoute } from "../../../utils/get-full-route.helper";

export function authRouting() {
  return [
    { path: ROUTES.LOGIN, element: <Login/> },
    { path: ROUTES.REGISTER, element: <Register/> },
    { path: `${ ROUTES.VERIFY_ACCOUNT }/:activationToken`, element: <VerifyAccount/> },
    { path: '*', element: <Navigate to={ getFullRoute(ROUTES.LOGIN) }/> },
  ];
}
