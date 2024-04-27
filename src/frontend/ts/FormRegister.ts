import { showToast } from "./Toast";

function validateRegisterForm(): boolean {
  const form = document.getElementById('form-register') as HTMLFormElement;
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const phone = (document.getElementById('phone') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

  const nameRegex: RegExp = /^.{3,}$/;
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex: RegExp = /^[0-9]{10,11}$/;
  const passwordRegex: RegExp = /^.{8,}$/;

  let valid: boolean = true;

  if (!nameRegex.test(name)) {
    showToast('Nome deve ter no mínimo 3 caracteres.');
    valid = false;
  }

  if (!emailRegex.test(email)) {
    showToast('E-mail não é válido.');
    valid = false;
  }

  if (!phoneRegex.test(phone)) {
    showToast('Telefone não é válido.');
    valid = false;
  }

  if (!passwordRegex.test(password)) {
    showToast('Senha deve ter no mínimo 8 caracteres.');
    valid = false;
  }

  if (valid) {
    form.submit();
  }

  return valid;
}

try {
  document.getElementById('submit-btn-register')!.addEventListener('click', function (event) {
    event.preventDefault();
  
    if (validateRegisterForm()) {
      console.log('Formulário válido. Pronto para enviar.');
    }
  });
} catch (error) {
  console.log(error);
}

export { validateRegisterForm };