import { FieldState } from "formstate";
import { action, makeObservable, observable } from "mobx";

// utils
import { Validators } from "../../../utils/validators";

class _VerifyAccountViewStore {
  titleState = 'Verifying Your account, please wait...';
  isLoading = true;
  showEmailInput = false;

  emailCtrl = new FieldState('').validators(Validators.required, Validators.email);

  constructor() {
    makeObservable(this, {
      titleState: observable,
      isLoading: observable,
      showEmailInput: observable,
      emailCtrl: observable,
      setIsLoading: action,
      setTitleState: action,
    })
  }

  setIsLoading(value) {
    this.isLoading = value;
  }

  setTitleState(value) {
    this.titleState = value;
  }

  setShowEmailInput(value) {
    this.showEmailInput = value;
  }
}

export const VerifyAccountViewStore = new _VerifyAccountViewStore();
