import { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, options = {}) => {
        const id = Date.now();
        setToasts([...toasts, { id, message, ...options }]);
        setTimeout(() => setToasts(t => t.filter(toast => toast.id !== id)), 3000);
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-4 right-4">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`text-white p-4 mb-2 rounded ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);