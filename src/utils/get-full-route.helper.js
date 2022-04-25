import { ROUTES } from "../constants/routes.constant";

export function getFullRoute(route) {
  const config = {
    [ROUTES.LOGIN]: `${ ROUTES.AUTH }/${ ROUTES.LOGIN }`,
    [ROUTES.REGISTER]: `${ ROUTES.AUTH }/${ ROUTES.REGISTER }`,
    [ROUTES.UPDATE_POST]: `${ROUTES.POSTS}/${ROUTES.UPDATE_POST}/`,
    [ROUTES.VIEW_POST]: `${ROUTES.POSTS}/`,
  };

  return `/${ config[route] || route }`;
}
