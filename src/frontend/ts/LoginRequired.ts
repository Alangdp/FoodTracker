import axios from "axios";
import { tokenManager } from "./Storage";
import { ResponseProps } from "../../types/Response.type";

async function loginRequired() {
  const token = tokenManager.readToken();
  if(!token) {
    tokenManager.setToken("");
  }

  const response = await axios.post("/v1/company/get/", {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  const data: ResponseProps<{valid: boolean}> = response.data;

  if(!data.data?.valid) window.location.href = "/";
  window.location.href = "/company/products";
}

export { loginRequired };
