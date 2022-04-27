export function convertJsonToFormDataHelper(obj) {
  if (!obj) {
    return new FormData();
  }

  const formData = new FormData();

  Object.keys(obj).forEach((key) => {
    if (!!obj[key]) {
      formData.append(key, obj[key]);
    }
  });

  return formData;
}
