import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { UserStoreService } from '../services/user-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userStoreService: UserStoreService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.usuariAutenticat();
  }
  usuariAutenticat(): true|UrlTree {
   // if (this.userStoreService.isUsuariAutenticat()) { 
    if(this.userStoreService.getToken()){
      return true; 
    }
    // Redirect to the login page
    return this.router.parseUrl('/login');
  }
}
