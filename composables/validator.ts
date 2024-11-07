
import type { ObjectSchema, ValidationError, InferType } from 'yup';


export const defineValidator = <V extends Validator, Args extends any[] = any[]>(validator: (...args: Args) => V) => {
  return validator;
}


type ObjectSchemaField = {
  type: 'array'|'boolean'|'date'|'mixed'|'number'|'object'|'string';
  fields?: {
    [key: string]: ObjectSchemaField
  };
}

export const useInitialErrors = <F extends object>(yupRules: ObjectSchemaField|ObjectSchema<F>, errors: Ref<ApiErrors>, path: string[] = []) => {
  if (yupRules.fields) {
    _toPairs(yupRules.fields).forEach(([key, field]) => {

      const actualPath = path.concat([key]);

      if (field.type === 'array') _set(errors.value, actualPath.join('.'), []);

      if (field.type === 'object') {
        _set(errors.value, actualPath.join('.'), {});
        useInitialErrors(field, errors, actualPath);
      }

    });
  }
};

export const useRules = (yupRules: ObjectSchema<any>, form: Ref<any>, errors: Ref<ApiErrors>) => {
  useInitialErrors(yupRules, errors);

  return (field: string) => {

    return () => {
      _set(errors.value, field, []);

      yupRules.validateAt(field, form.value).catch((error: ValidationError) => {
        _set(errors.value, field, error.errors);
      })
    };

  };
};

export const useValidateSchema = async <F extends object, R extends object>(yupRules: ObjectSchema<R>, form: Ref<F>, errors: Ref<ApiErrors>) => {
  return await yupRules.validate(form.value, { abortEarly: false })
    .then(() => true)
    .catch((error: ValidationError) => {
      if (error.inner) {
        error.inner.forEach((innerError) => {
          if (innerError.path) _set(errors.value, innerError.path, innerError.errors);
        });
      }

      return false;
    });
}

export const useValidateSchemaAt = async <F extends object, R extends object>(yupRules: ObjectSchema<R>, form: Ref<F>, errors: Ref<ApiErrors>, field: string) => {
  return await yupRules.validateAt(field, form.value, { abortEarly: false })
    .then(() => true)
    .catch((error: ValidationError) => {
      if (error.inner) {
        error.inner.forEach((innerError) => {
          if (innerError.path) _set(errors.value, innerError.path, innerError.errors);
        });
      }

      return false;
    });
}


export const useValidatedForm = <S extends ObjectSchema<any, any, any, any>>(rules: S) => {
  return ref<InferType<S>>(rules.getDefault() as unknown as InferType<S>);
}

export const useClearValidatedForm = <S extends ObjectSchema<any, any, any, any>>(rules: S, form: Ref<InferType<S>>, errors: Ref<ApiErrors>) => {
  form.value = (rules.getDefault() as any);
  nextTick(() => useResetErrors(errors.value));
}
