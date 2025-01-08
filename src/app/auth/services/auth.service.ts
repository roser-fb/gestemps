import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Auth } from "../models/auth.dto";
import { map, Observable } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { AuthStoreService } from "./auth-store.service";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url: string | null = null;

  constructor(
    private http: HttpClient,
    private authStoreService: AuthStoreService
  ) {}
  login(user: Auth): Observable<any> {
    return this.http.post("/api/auth/login", user);
  }
  usuariAutenticat(): boolean {
    const token = this.authStoreService.get("token");
    console.log(token);
    if (token) console.log(this.tokenCaducat(token));
    if (token && !this.tokenCaducat(token)) {
      return true;
    }
    return false;
  }

  usuariRol(): number | null {
    const token = this.authStoreService.get("token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return parseInt(decodedToken.rol);
    }
    return null;
  }

  setUrl(url: string | null): void {
    console.log("set: " + url);
    this.url = url;
  }
  getUrl(): string | null {
    console.log("get: " + this.url);
    return this.url;
  }
  tokenCaducat(token: string) {
    const decodedToken: any = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
      this.authStoreService.delete("token");
      this.authStoreService.delete("user_id");
      return true;
    }
    return false;
  }
}
