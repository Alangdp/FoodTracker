import "./Toast";
import { tokenManager } from "./Storage";
import "./FormRegister";
import "./FormLogin";
import "./Files";
import "./LoginRequired";

const inputsToken: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="userToken"]');
if(inputsToken) {
  for(const input of inputsToken) {
    input.value = tokenManager.readToken() || "123";
  }
}