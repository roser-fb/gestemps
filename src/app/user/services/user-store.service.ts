import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private usuariToken: string | null = null;
  private usuariId: string | null = null;

  constructor() {}
  isUsuariAutenticat(): boolean {
    this.usuariToken = this.getToken();
    this.usuariId = this.getUserId();
    if (this.usuariToken && this.usuariId) {
      return true;
    } else {
      return false;
    }
  }
  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token !== null ? token : null;
  }

  setToken(usuariToken: string): void {
    this.usuariToken = usuariToken;
    localStorage.setItem('token', usuariToken);
  }
  deleteToken(): void {
    localStorage.removeItem('token');
  }
  getUserId(): string | null {
    const user = localStorage.getItem('userId');
    return user !== null ? user : null;
  }

  setUserId(usuariId: string): void {
    this.usuariId = usuariId;
    localStorage.setItem('userId', usuariId);
  }
  deleteUserId(): void {
    localStorage.removeItem('userId');
  }
}
