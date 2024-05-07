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

type ToastType = 'Success' | 'Warning' | 'Normal' | 'Error'

export function showToast(type: ToastType, content: string, id: number) {
  let colorClass = '';
  let icon = '';

  switch (type) {
    case 'Success':
      colorClass = 'text-teal-500';
      icon =
        '<svg class="flex-shrink-0 size-4 ' +
        colorClass +
        ' mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">' +
        '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>' +
        '</svg>';
      break;
    case 'Warning':
      colorClass = 'text-yellow-500';
      icon =
        '<svg class="flex-shrink-0 size-4 ' +
        colorClass +
        ' mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">' +
        '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>' +
        '</svg>';
      break;
    case 'Normal':
      colorClass = 'text-blue-500';
      icon =
        '<svg class="flex-shrink-0 size-4 ' +
        colorClass +
        ' mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">' +
        '<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>' +
        '</svg>';
      break;
    case 'Error':
      colorClass = 'text-red-500';
      icon =
        '<svg class="flex-shrink-0 size-4 ' +
        colorClass +
        ' mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">' +
        '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>' +
        '</svg>';
      break;
    default:
      break;
  }

  const messageHTML =
    `<div id="${id}" class="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg` +
    type +
    '" role="alert">' +
    '<div class="flex p-4">' +
    '<div class="flex-shrink-0">' +
    icon +
    '</div>' +
    '<div class="ms-3">' +
    '<p class="text-sm ' +
    colorClass +
    '">' +
    content +
    '</p>' +
    '</div>' +
    '</div>' +
    '</div>';

  return messageHTML;
}

function addMessage(
  container: HTMLElement,
  type: 'Success' | 'Warning' | 'Normal' | 'Error',
  content: string,
) {
  const id = Math.random();
  const message = showToast(type, content, id);
  
  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = message;
  const toast = tempContainer.firstChild as HTMLElement;

  container.appendChild(toast);

  setTimeout(function () {
    toast.remove();
  }, 3000);
}

const toastContainer = document.getElementById('toast-container');
export { toastContainer, addMessage };