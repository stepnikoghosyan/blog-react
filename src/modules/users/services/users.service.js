// services
import { BaseApiService } from "../../shared/services/base-api.service";

// constants
const BASE_ENDPOINT = 'users';

export const UsersService = {
  currentUser: null,

  getCurrentUser: () => {
    return BaseApiService.get(`${BASE_ENDPOINT}/my-profile`)
      .then((response) => {
        UsersService.currentUser = response.data;
        return response;
      });
  },
};
