import { addMessage, toastContainer } from "./Toast";
import { tokenManager } from "./Storage";
import axios from "axios";
import { ResponseProps } from "../../types/Response.type";

function validateRegisterForm(name: string, email: string, phone: string, password: string): boolean {
  const nameRegex: RegExp = /^.{3,}$/;
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex: RegExp = /^[0-9]{10,11}$/;
  const passwordRegex: RegExp = /^.{8,}$/;

  let valid: boolean = true;

  if (!nameRegex.test(name)) {
    addMessage(toastContainer!, "Error", 'Nome deve ter no mínimo 3 caracteres.');
    valid = false;
  }

  if (!emailRegex.test(email)) {
    addMessage(toastContainer!, "Error", 'E-mail não é válido.');
    valid = false;
  }

  if (!phoneRegex.test(phone)) {
    addMessage(toastContainer!, "Error", 'Telefone não é válido.');
    valid = false;
  }

  if (!passwordRegex.test(password)) {
    addMessage(toastContainer!, "Error", 'Senha deve ter no mínimo 8 caracteres.');
    valid = false;
  }

  return valid;
}

function initializeFormRegister() {
  const submitButton = document.getElementById("submit-btn-register");
  const name = document.getElementById('name-input') as HTMLInputElement;
  const email = document.getElementById('email-input') as HTMLInputElement;
  const phone = document.getElementById('phone-input') as HTMLInputElement;
  const password = document.getElementById('password-input') as HTMLInputElement;

  
  submitButton?.addEventListener("click", async () => {
    if(validateRegisterForm(name.value, email.value, phone.value, password.value)) {
      const response = await axios.post("/v1/company/", {
        name: name.value,
        email: email.value,
        phone: phone.value,
        password: password.value
      });

      const data: ResponseProps<{token: string}> = response.data; 
      tokenManager.setToken(data.data?.token || "");
      addMessage(toastContainer!, "Success", "Registro concluído");
      window.location.replace("/company");
    }
  });
}

initializeFormRegister();
