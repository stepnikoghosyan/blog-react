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

  notOnlySpaces: (value) => {
    if (!value) {
      return null;
    }

    return !!value.trim() ? null : 'Input cannot contain only spaces';
  },

  imageMimeType: (allowedTypes) => {
    const types = allowedTypes || ['*'];

    return (value) => {
      if (!value) {
        return null;
      }

      if (value instanceof File) {
        // eslint-disable-next-line
        return new RegExp(`image\/(${types.join('|')})`).test(value.type) ? null : `Invalid file type. Allowed types are: ${ allowedTypes }`;
      }

      return null;
    };
  },

  fileSize: (sizeInBytes = undefined) => {
    const maxFileSize = sizeInBytes || 2 * 1024 * 1024; // 2 MB

    return (value) => {
      if (!value) {
        return null;
      }

      if (value instanceof File) {
        if (value.size <= maxFileSize) {
          return null;
        }

        // Convert Byte to MB
        const maxAllowedSizeInMb = (maxFileSize / 1024 / 1024).toFixed(1);
        const actualSizeInMb = (value.size / 1024 / 1024).toFixed(1);

        return `Maximum allowed file size is ${ maxAllowedSizeInMb }MB, selected image is ${ actualSizeInMb }MB`;
      }

      return null;
    };
  },
};
