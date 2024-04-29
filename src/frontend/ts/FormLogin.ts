import { showToast } from "./Toast";

function validateLoginForm(): boolean {
  const form = document.getElementById('form-register') as HTMLFormElement;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex: RegExp = /^.{8,}$/;

  let valid: boolean = true;

  if (!emailRegex.test(email)) {
    showToast('E-mail não é válido.');
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
  document.getElementById('submit-btn-login')!.addEventListener('click', function (event) {
    event.preventDefault();
  
    if (validateLoginForm()) {
      console.log('Formulário válido. Pronto para enviar.');
    }
  });
} catch (error) {
  console.log(error);
}

export { validateLoginForm };