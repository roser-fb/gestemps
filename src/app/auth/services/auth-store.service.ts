import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthStoreService {
  private usuariToken: string | null = null;
  private usuariId: string | null = null;
  private usuariImg: string | null = null;

  constructor() {}
  isUsuariAutenticat(): boolean {
    this.usuariToken = this.get("token");
    this.usuariId = this.get("user_id");
    this.usuariImg = this.get("user_img");
    if (this.usuariToken && this.usuariId) {
      return true;
    } else {
      return false;
    }
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }
}
