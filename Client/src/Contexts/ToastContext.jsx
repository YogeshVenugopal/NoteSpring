import { createContext, useState } from "react";
import Toast from "../Components/Common/Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = "info", duration = 3000) => {
        const id = Date.now();
        setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
        setTimeout(() => {
            removeToast(id);
        }, duration);
    };

    const removeToast = (id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };
    return (
        <ToastContext.Provider value={{ showToast, removeToast }}>
            {children}
            <div className="fixed top-[20px] right-[20px] flex flex-col gap-3 z-50">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        toast={toast}
                        onClose={removeToast}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export default ToastContext;