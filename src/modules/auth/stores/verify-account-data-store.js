// services
import { AuthService } from "../services/auth.service";

export class VerifyAccountDataStore {
  verifyAccountViewStore;

  constructor(verifyAccountViewStore) {
    this.verifyAccountViewStore = verifyAccountViewStore;
  }

  async verifyAccount(activationToken) {
    try {
      await AuthService.verifyAccount(activationToken);
      // TODO: show success toastr
    } catch (err) {
      let message;
      if (!!err.response) {
        message = err.response.data.message || 'Unknown Error Occurred';
      } else {
        message = 'Unknown Error Occurred';
      }

      // TODO: show error toastr
      alert(message);

      this.verifyAccountViewStore.setTitleState('Could not verify account.');
      this.verifyAccountViewStore.setIsLoading(false);
    }
  }

  async resendActivationToken() {
    const result = await this.verifyAccountViewStore.emailCtrl.validate();
    if (result.hasError) {
      return;
    }

    this.verifyAccountViewStore.setIsLoading(true);
    this.verifyAccountViewStore.setTitleState('Verifying Your account, please wait...');

    try {
      await AuthService.resendActivationToken(this.verifyAccountViewStore.emailCtrl.$);

      // TODO: show success toastr
      alert('Account verified');
    } catch (err) {
      let message;
      if (!!err.response) {
        message = err.response.data.message || 'Unknown Error Occurred';
      } else {
        message = 'Unknown Error Occurred';
      }

      // TODO: show error toastr
      alert(message);
      this.verifyAccountViewStore.setIsLoading(false);
      this.verifyAccountViewStore.setTitleState('Failed to re-send activated token.');
    }
  }
}
