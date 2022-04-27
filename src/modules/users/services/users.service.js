// services
import { BaseApiService } from "../../shared/services/base-api.service";
import { AppDataStore } from "../../shared/stores/app-data-store";

// constants
const BASE_ENDPOINT = 'users';

export const UsersService = {
  getCurrentUser: () => {
    return BaseApiService.get(`${ BASE_ENDPOINT }/my-profile`)
      .then((response) => {
        AppDataStore.setCurrentUser(response.data);
        return response;
      });
  },
  getUsers: (queryParams) => {
    return BaseApiService.get(`${ BASE_ENDPOINT }`, {
      params: queryParams,
    });
  },
};
