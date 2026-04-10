import { useCallback, useEffect, useMemo, useState } from "react";
import { SESSION_EXPIRED_EVENT } from "../../services/api/apiClient";
import { ToastContext } from "./toastContext";

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, message, type = "info" }) => {
      const id = Date.now();
      setToasts((current) => [...current, { id, title, message, type }]);
      window.setTimeout(() => dismiss(id), 4200);
    },
    [dismiss],
  );

  useEffect(() => {
    const handleSessionExpired = () => {
      showToast({
        title: "Session expired",
        message: "Please login again to continue.",
        type: "warning",
      });
    };

    window.addEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
    return () =>
      window.removeEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
  }, [showToast]);

  const value = useMemo(() => ({ showToast }), [showToast]);

  const tone = {
    info: "border-blue-100 bg-blue-50 text-blue-800",
    success: "border-green-100 bg-green-50 text-green-800",
    warning: "border-amber-100 bg-amber-50 text-amber-800",
    error: "border-red-100 bg-red-50 text-red-800",
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-[100] max-w-[calc(100vw-2rem)] space-y-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`w-80 max-w-full rounded-lg border px-4 py-3 shadow-lg ${
              tone[toast.type] || tone.info
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{toast.title}</p>
                {toast.message && (
                  <p className="mt-1 text-sm opacity-90">{toast.message}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="text-sm font-semibold opacity-70 hover:opacity-100"
                aria-label="Dismiss notification"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
