let activeToast: string[] = [];
createToastContainer();

function createToastContainer() {
  let container = document.getElementById('toast-container');

  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.classList.add(
      'grid',
      'gap-2',
      'w-32',
      'p-4',
      'space-y-4',
      'rtl:space-x-reverse',
      'fixed', 
      'top-0',
      'right-0',
      'hidden',
      'transition-opacity',
      'duration-300',
      'ease-in-out'
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

function showToast(message: string = '', type?: 'SUCCESS' | 'ERROR'): void {
  createToast(message, type);
  addTimerToCloseToast();
}

function createToast(message: string, type?: 'SUCCESS' | 'ERROR'): void {
  if (!message) return;
  const container = document.getElementById('toast-container');
  const toastId = random(8);

  const newToast = document.createElement('div');
  newToast.id = toastId;
  newToast.classList.add(
    'p-4',
    'flex',
    'items-center',
    'bg-white',
    'rounded-lg',
    'shadow',
    'dark:bg-gray-800'
  );

  const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgIcon.classList.add('w-5', 'h-5');
  svgIcon.style.fill = '#000';
  svgIcon.setAttribute('aria-hidden', 'true');
  svgIcon.setAttribute('viewBox', '0 0 18 20');

  const pathIcon = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathIcon.setAttribute('d', 'm9 17 8 2L9 1 1 19l8-2Zm0 0V9');

  svgIcon.appendChild(pathIcon);

  const messageDiv = document.createElement('div');
  messageDiv.classList.add('ps-4', 'text-sm', 'font-normal', 'text-gray-500', 'dark:text-gray-400');
  messageDiv.innerText = message;

  newToast.appendChild(svgIcon);
  newToast.appendChild(messageDiv);

  container!.appendChild(newToast);
  activeToast.push(toastId);
}

function addTimerToCloseToast(): void {
  if (activeToast.length > 0) {
    activeToast.forEach((toastId, index) => {
      setTimeout(() => {
        const toast = document.getElementById(toastId);
        if (toast) {
          toast.style.transition = "opacity 0.5s";
          toast.style.opacity = "0";
          setTimeout(() => {
            toast.remove();
          }, 500); 
        }
      }, 2000 * (index + 1)); 
    });
    activeToast = []; 
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
