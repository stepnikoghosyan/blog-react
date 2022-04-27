// services
import { AuthService } from "../services/auth.service";
import { StorageService } from "../../shared/services/storage-service";
import { UsersService } from "../../users/services/users.service";

export class LoginDataStore {
  loginViewStore;

  constructor(loginViewStore) {
    this.loginViewStore = loginViewStore;
  };

  async login() {
    try {
      this.loginViewStore.setIsLoading(true);

      const res = await this.loginViewStore.form.validate();
      if (res.hasError) {
        return;
      }

      const response = await AuthService.login({
        email: this.loginViewStore.form.$.email.$,
        password: this.loginViewStore.form.$.password.$,
      });

      StorageService.setTokens(response.data);

      await UsersService.getCurrentUser();
    } catch (err) {
      if (!!err.response) {
        this.loginViewStore.setApiErrorMsg(err.response.data.message);
      } else {
        this.loginViewStore.setApiErrorMsg('');
        alert('Unknown error occurred');
      }
    } finally {
      this.loginViewStore.setIsLoading(false);
    }
  }
}
