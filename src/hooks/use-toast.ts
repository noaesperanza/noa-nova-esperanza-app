import { useState, useCallback } from 'react';

export type Toast = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive';
};

type ToasterToast = Toast & {
  id: string;
  open: boolean;
};

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 5000;

let count = 0;
const genId = () => {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
};

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string, onRemove: () => void) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    onRemove();
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export function useToast() {
  const [toasts, setToasts] = useState<ToasterToast[]>([]);

  const toast = useCallback(
    ({ ...props }: Omit<Toast, 'id'>) => {
      const id = genId();

      const newToast: ToasterToast = {
        ...props,
        id,
        open: true,
      };

      setToasts((prevToasts) => {
        const newToasts = [newToast, ...prevToasts].slice(0, TOAST_LIMIT);
        return newToasts;
      });

      addToRemoveQueue(id, () => {
        setToasts((prevToasts) =>
          prevToasts.map((t) => (t.id === id ? { ...t, open: false } : t))
        );
      });

      return {
        id,
        dismiss: () => {
          setToasts((prevToasts) =>
            prevToasts.map((t) => (t.id === id ? { ...t, open: false } : t))
          );
        },
        update: (props: Partial<Toast>) => {
          setToasts((prevToasts) =>
            prevToasts.map((t) => (t.id === id ? { ...t, ...props } : t))
          );
        },
      };
    },
    []
  );

  const dismiss = useCallback((toastId?: string) => {
    setToasts((prevToasts) => {
      if (toastId) {
        return prevToasts.map((t) =>
          t.id === toastId ? { ...t, open: false } : t
        );
      }
      return prevToasts.map((t) => ({ ...t, open: false }));
    });
  }, []);

  return {
    toasts,
    toast,
    dismiss,
  };
}

