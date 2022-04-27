import { FieldState, FormState } from "formstate";
import { action, makeObservable, observable } from "mobx";

// validators
import { Validators } from "../../../utils/validators";

export class ManagePostViewStore {
  form = new FormState({
    id: new FieldState(null),
    title: new FieldState('').validators(Validators.required, Validators.notOnlySpaces),
    body: new FieldState('').validators(Validators.required, Validators.notOnlySpaces),
    image: new FieldState(null).validators(Validators.imageMimeType(['jpg', 'jpeg', 'png'], Validators.fileSize())),
  });

  isLoading = false;

  apiErrorMsg = '';

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      apiErrorMsg: observable,
      setIsLoading: action,
      setApiErrorMsg: action,
      setFormValues: action,
    });
  }

  setIsLoading(value) {
    this.isLoading = value;
  }

  setApiErrorMsg(value) {
    this.apiErrorMsg = value;
  }

  setFormValues(post) {
    this.form.$.id.onChange(post.id);
    this.form.$.title.onChange(post.title);
    this.form.$.body.onChange(post.body);
    this.form.$.image.onChange(post.imageUrl)
  }
}
