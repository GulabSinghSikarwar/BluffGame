import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ToastService {
    static instance = null;

    constructor() {
        if (ToastService.instance) {
            return ToastService.instance;
        }
        ToastService.instance = this;
    }

    success(message, options = {}) {
        toast.success(message, { ...options });
    }

    error(message, options = {}) {
        toast.error(message, { ...options });
    }

    info(message, options = {}) {
        toast.info(message, { ...options });
    }

    warning(message, options = {}) {
        toast.warn(message, { ...options });
    }
}

const toastService = new ToastService();
Object.freeze(toastService); // Ensure the instance is immutable

export default toastService;
