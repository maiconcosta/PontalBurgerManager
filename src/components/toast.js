import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastConfig = {
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const toastSuccess = (message) => {
  toast.success(message, toastConfig);
};

const toastError = (message) => {
  toast.error(message, toastConfig);
};


export { toastSuccess, toastError };
