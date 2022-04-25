// constants
import { ROUTES } from "../../../../../constants/routes.constant";

// utils
import { getFullRoute } from "../../../../../utils/get-full-route.helper";

export function getNavigationItemsConfig() {
  return [
    {
      label: 'Home',
      route: getFullRoute(ROUTES.HOME),
      routerLinkActive: 'custom-active',
    },
    {
      label: 'Users',
      route: getFullRoute(ROUTES.USERS),
      routerLinkActive: 'custom-active',
    },
    {
      label: 'Posts',
      route: getFullRoute(ROUTES.POSTS),
      routerLinkActive: 'custom-active',
    },
  ];
}
