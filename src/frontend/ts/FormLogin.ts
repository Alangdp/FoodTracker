import { addMessage,toastContainer } from "./Toast";

function validateLoginForm(email: string, password: string) {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex: RegExp = /^.{8,}$/;
  let valid: boolean = true;
  if (!emailRegex.test(email)) {
    addMessage(toastContainer!, "Error", 'E-mail não é válido.');
    valid = false;
  }

  if (!passwordRegex.test(password)) {
    addMessage(toastContainer!, "Error", 'Senha deve ter no mínimo 8 caracteres.');
    valid = false;
  }

  return valid;
}

function initializeFormLogin() {
  const form = document.getElementById('form-login') as HTMLFormElement;
  const email = document.getElementById('email-input') as HTMLInputElement;
  const password = document.getElementById('password-input') as HTMLInputElement;
  const submitButton = document.getElementById("submit-btn-login");

  submitButton?.addEventListener("click", async () => {
    if(validateLoginForm(email.value, password.value)) {
      form.method = "POST";
      form.submit();
    }
  });
}

initializeFormLogin();





