import { action, makeObservable, observable } from "mobx";
import { FieldState, FormState } from "formstate";

// validators
import { Validators } from "../../../utils/validators";

export class RegisterViewStore {
  form = new FormState({
    firstName: new FieldState('').validators(Validators.required),
    lastName: new FieldState('').validators(Validators.required),
    email: new FieldState('').validators(Validators.required, Validators.email),
    password: new FieldState(''),
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
