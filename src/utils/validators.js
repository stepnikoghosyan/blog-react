export const Validators = {
  required: (value) => {
    return !value && 'Required';
  },

  email: (value) => {
    if (Validators.required(value)) {
      return null;
    }

    value = value.trim();

    if (
      // eslint-disable-next-line
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.exec(
        value
      )
    ) {
      return 'Not a valid email address';
    }
    return null;
  },
};
