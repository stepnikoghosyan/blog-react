import { ROUTES } from "../constants/routes.constant";

export function getFullRoute(route) {
  const config = {
    [ROUTES.LOGIN]: `${ ROUTES.AUTH }/${ ROUTES.LOGIN }`,
    [ROUTES.REGISTER]: `${ ROUTES.AUTH }/${ ROUTES.REGISTER }`,
  };

  return `/${ config[route] || route }`;
}
