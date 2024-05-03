import { showToast } from "./Toast";
import { tokenManager } from "./Storage";
import { ResponseProps } from "../../types/Response.type";
import axios from "axios";

function validateLoginForm(email: string, password: string) {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex: RegExp = /^.{8,}$/;
  let valid: boolean = true;
  if (!emailRegex.test(email)) {
    showToast('E-mail não é válido.', "ERROR");
    valid = false;
  }

  if (!passwordRegex.test(password)) {
    showToast('Senha deve ter no mínimo 8 caracteres.', "ERROR");
    valid = false;
  }

  return valid;
}

function initializeFormLogin() {
  const email = document.getElementById('email-input') as HTMLInputElement;
  const password = document.getElementById('password-input') as HTMLInputElement;
  const submitButton = document.getElementById("submit-btn-login");

  submitButton?.addEventListener("click", async () => {
    if(validateLoginForm(email.value, password.value)) {
      const response = await axios.post("/v1/company/login", {
        email: email.value, 
        password: password.value
      });
    
      const data: ResponseProps<{token: string}> = response.data; 
      tokenManager.setToken(data.data?.token || "");
      showToast("Login Concluido", "ERROR");
    }
  });
}

initializeFormLogin();





