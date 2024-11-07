
export const defineSafeSpace = async (fn: () => Promise<any>, onError: () => Promise<void>) => {
  try {
    await fn();
  } catch (e) {
    await onError();
    throw new InternalHandledError('Error in safe space', {
      cause: e
    });
  }
};

export const useCallAndReturn = <R>(fn: (response: R) => any) => {
  return (response: R) => {
    fn(response);
    return response;
  }
};
