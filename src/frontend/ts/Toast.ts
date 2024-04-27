let activeToast: string[] = [];
createToastContainer();

function createToastContainer() {
  let container = document.getElementById('toast-container');

  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.classList.add(
      'w-fit',
      'h-fit',
      'bg-blue-500',
      'shadow-lg',
      'grid',
      'grid-cols-1',
      'fixed',
      'top-0',
      'right-0',
      'mr-4',
      'mt-4',
      'p-4',
      'rounded',
      'gap-2',
      'hidden',
    );

    document.body.appendChild(container);

    const observer = new MutationObserver(() => {
      if (container!.children.length > 0) container!.classList.remove('hidden');
      if (container!.children.length === 0) container!.classList.add('hidden');
    });

    observer.observe(container!, { childList: true });
  }
}

function random(length: number = 8): string {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function showToast(message: string = ''): void {
  createToast(message);
  addTimerToCloseToast();
}

function createToast(message: string): void {
  if (!message) return;
  const container = document.getElementById('toast-container');
  const toastId = random(8);

  const newToast = document.createElement('div');
  newToast.id = toastId;
  newToast.classList.add(
    'card',
    'p-2',
    'bg-white',
    'overflow-hidden',
    'text-ellipsis',
    'whitespace-nowrap',
    'rounded',
  );
  newToast.innerText = message;
  container!.appendChild(newToast);

  activeToast.push(toastId);
}

function addTimerToCloseToast(): void {
  if (activeToast.length > 0) {
    for (const toastId of activeToast) {
      activeToast = activeToast.filter(id => id !== toastId);

      setTimeout(() => {
        const toast = document.getElementById(toastId);
        toast!.remove();
      }, 2000);
    }
  }
}

export {
  activeToast,
  addTimerToCloseToast,
  createToast,
  createToastContainer,
  random,
  showToast,
};
