import { FieldState, FormState } from "formstate";
import { Validators } from "../../../utils/validators";
import { action, makeObservable, observable } from "mobx";

class _LoginViewStore {
  form = new FormState({
    email: new FieldState('').validators(Validators.required, Validators.email),
    password: new FieldState('').validators(Validators.required),
  });

  isLoading = false;

  apiErrorMsg = '';

  constructor() {
    makeObservable(this, {
      form: observable,
      apiErrorMsg: observable,
      setApiErrorMsg: action,
      isLoading: observable,
      setIsLoading: action,
    });
  }

  setApiErrorMsg(msg) {
    this.apiErrorMsg = msg;
  }

  setIsLoading(value) {
    this.isLoading = value;
  }
}

export const LoginViewStore = new _LoginViewStore();
