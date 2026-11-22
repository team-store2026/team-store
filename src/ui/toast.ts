export type ToastType = 'success' | 'error';

const TOAST_LIFETIME_MS = 3500;

let stack: HTMLElement | null = null;

function getStack(): HTMLElement {
  if (stack && document.body.contains(stack)) {
    return stack;
  }

  stack = document.createElement('div');
  stack.className = 'toast-stack';
  stack.dataset.toastStack = '';
  document.body.append(stack);

  return stack;
}

export function showToast(message: string, type: ToastType = 'success'): void {
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  // role="alert" announces errors immediately, status — politely
  toast.setAttribute('role', type === 'error' ? 'alert' : 'status');

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'toast__close';
  closeBtn.setAttribute('aria-label', 'Закрыть уведомление');
  closeBtn.textContent = '×';

  function dismiss(): void {
    if (!toast.isConnected || toast.classList.contains('toast--leaving'))
      return;
    toast.classList.add('toast--leaving');
    toast.addEventListener('animationend', () => toast.remove(), {
      once: true,
    });
  }

  closeBtn.addEventListener('click', dismiss);
  toast.append(closeBtn);
  getStack().append(toast);

  window.setTimeout(dismiss, TOAST_LIFETIME_MS);
}
