import { toast, type ToastType } from 'vue3-toastify';

type Severity = 'success' | 'warning' | 'error' | 'info' | 'rainbow';

const severity = <Record<Severity, ToastType>>{
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
  rainbow: 'default',
}

type NotifyParams = {
  type?: Severity;
  message: string;
}

export const useNotify = ({
  type = 'info',
  message
}: NotifyParams) => {
  return toast(message, {
    type: severity[type],
    position: 'bottom-center'
  });
};
