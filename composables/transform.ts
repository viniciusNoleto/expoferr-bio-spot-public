
export const useFormDataTransformer = (object: object, formData: FormData = new FormData(), fatherKey: string = '') => {

  _forEach(object, (value: any, key: string) => {

    const completeKey = fatherKey ? `${fatherKey}[${key}]` : key;

    if (_isObject(value) && !(value instanceof File)) useFormDataTransformer(value, formData, completeKey);
    else formData.append(completeKey, value);

  });

  return formData;

};
