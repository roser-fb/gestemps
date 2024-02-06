import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.dto';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[];
  constructor(private http: HttpClient) {
    this.users = [new User('', '')];
  }
  login(user: User): Observable<any> {
    return this.http.post('/api/user/login', user);
  }
  register(user: User): Observable<any> {
    this.users.push(user);
    return this.http.post('/api/user/register', user);
  }
}
