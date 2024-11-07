

export type Validator<V extends object = object> = {
  form: Ref<V>,
  rules: ReturnType<typeof useRules>
}

export type ValidatorFormType<V extends (...args: any[]) => { form: Ref }> = ReturnType<V>['form']['value'];
