import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Auth } from "../models/auth.dto";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(user: Auth): Observable<any> {
    return this.http.post("/api/auth/login", user);
  }
}
