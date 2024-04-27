import "./Toast";
import "./FormRegister";
import "./FormLogin";
import LocalManager from "./Storage";

const tokenManager = new LocalManager("token");
const userToken = tokenManager.readToken();
