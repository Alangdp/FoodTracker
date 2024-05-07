import { showToast, toastContainer, addMessage } from "./Toast";

/* eslint-disable @typescript-eslint/no-unused-vars */
const dropzoneFile = document.getElementById('dropzone-file');

if (dropzoneFile) {
  dropzoneFile.addEventListener('change', handleFileSelect, false);
}

function handleFileSelect(event: Event) {
  event.stopPropagation();

  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  const files: FileList = target.files;
  const imagePreview = document.getElementById('image-preview');

  // Função para verificar a extensão do arquivo
  const isAllowedFileType = (fileName: string) => {
    const allowedExtensions = ['png', 'jpg'];
    const extension = fileName.split('.').pop()?.toLowerCase();
    return allowedExtensions.includes(extension || '');
  };

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = file.name;
    if (!isAllowedFileType(fileName)) {
      addMessage(toastContainer!, "Error" ,"Apenas arquivos PNG e JPG são permitidos.");
      continue;
    }
    
    const reader = new FileReader();

    reader.onload = ((file: File) => {
      return (e: ProgressEvent<FileReader>) => {
        if (!e.target) return;
        const target = e.target as FileReader;
        const imageTemplate = `
                    <div class="p-1 bg-white rounded-lg">
                      <div class="relative w-50 h-64 bg-cover bg-center border-black border rounded-lg" style="background-image: url('${target.result}');">
                        <a class="flex items-center justify-center absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full p-1 text-xs" onclick="deleteImage(this)" >X</a>
                      </div>  
                    </div>
                `;
        if (imagePreview) {
          imagePreview.insertAdjacentHTML('beforeend', imageTemplate);
        }
      };
    })(file);

    reader.readAsDataURL(file);
  }
}


function deleteImage(event: HTMLButtonElement) {
  const parentNode = event.parentNode;
  if (parentNode instanceof Node) {
    parentNode.removeChild(event);
  }
}
