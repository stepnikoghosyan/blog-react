// services
import { BaseApiService } from "../../shared/services/base-api.service";
import { StorageService } from "../../shared/services/storage-service";

// constants
import { ROUTES } from "../../../constants/routes.constant";
import { AppDataStore } from "../../shared/stores/app-data-store";
const BASE_ENDPOINT = 'auth';

export const AuthService = {
  login: (payload) => {
    return BaseApiService.post(`${ BASE_ENDPOINT }/login`, payload);
  },
  register: (payload) => {
    return BaseApiService.post(`${ BASE_ENDPOINT }/register`, payload);
  },
  verifyAccount: (activationToken) => {
    return BaseApiService.get(`${ BASE_ENDPOINT }/verify-account`, {
      params: {
        activationToken
      },
    });
  },
  resendActivationToken: (email) => {
    return BaseApiService.post(`${ BASE_ENDPOINT }/resend-activation-token`, {
      email,
    })
  },
  isAuthenticated: () => {
    return !!StorageService.getAccessToken();
  },
  logout: (navigate) => {
    StorageService.clear();
    AppDataStore.clear();
    navigate(ROUTES.LOGIN);
  },
};
