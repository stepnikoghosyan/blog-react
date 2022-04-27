// services
import { AuthService } from "../services/auth.service";

export class RegisterDataStore {
  registerViewStore;

  constructor(registerViewStore) {
    this.registerViewStore = registerViewStore;
  }

  async register() {
    this.registerViewStore.setIsLoading(true);

    const res = await this.registerViewStore.form.validate();
    if (res.hasError) {
      return;
    }

    try {
      await AuthService.register({
        firstName: this.registerViewStore.form.$.firstName.$,
        lastName: this.registerViewStore.form.$.lastName.$,
        email: this.registerViewStore.form.$.email.$,
        password: this.registerViewStore.form.$.password.$,
      });

      // TODO: Show success toastr
    } catch (err) {
      if (!!err.response) {
        this.registerViewStore.setApiErrorMsg(err.response.data.message);
      } else {
        this.registerViewStore.setApiErrorMsg('');
        alert('Unknown error occurred');
      }
    } finally {
      this.registerViewStore.setIsLoading(false);
    }
  }
}
