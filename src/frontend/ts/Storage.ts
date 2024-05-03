export default class LocalManager {
  private path: string;
  private actualValue: string;

  constructor(path: string) {
    this.path = path;
    const actualValue = this.readToken();
    if(!actualValue) {
      this.setToken("");
      this.actualValue = "";
      return;
    }

    this.actualValue = actualValue;
  }

  setToken(token: string) {
    localStorage.setItem(this.path, token);
  }

  readToken() {
    return localStorage.getItem(this.path);
  }
}


export const tokenManager = new LocalManager("token");