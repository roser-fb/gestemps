import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.dto";
import { map, Observable } from "rxjs";
import { Role } from "../models/roles.dto";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post("/api/user/register", user);
  }
  updateUser(id: string, user: User): Observable<any> {
    return this.http.put("/api/user/" + id, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("/api/user");
  }

  getUserById(id: string): Observable<User | undefined> {
    return this.getUsers().pipe(
      map((guardies: User[]) => guardies.find((user) => user.id == id))
    );
  }
  getUserByMail(mail: string): Observable<User | undefined> {
    return this.getUsers().pipe(
      map((guardies: User[]) => guardies.find((user) => user.mail === mail))
    );
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>("/api/user/" + id);
  }
  submitEvent: EventEmitter<void> = new EventEmitter<void>();

  newPassword(username: string): string {
    let result = "@";
    for (let i = 0; i < username.length; i++) {
      const char = username[i];
      if (char >= "A" && char <= "Z") {
        result += char.toLowerCase();
      } else if (char >= "a" && char <= "z") {
        result += char.toUpperCase();
      } else {
        result += char;
      }
    }
    return result;
  }
}
