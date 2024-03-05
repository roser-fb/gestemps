import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthStoreService } from "../services/auth-store.service";
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private AuthStoreService: AuthStoreService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.usuariAutenticat();
  }
  usuariAutenticat(): true | UrlTree {
    const token = this.AuthStoreService.getToken();
    if (token) {
      if (!this.tokenCaducat(token)) {
        return true;
      }
    }
    return this.router.parseUrl("/login");
  }
  tokenCaducat(token: string) {
    if (this.jwtHelper.isTokenExpired(token)) {
      this.AuthStoreService.deleteToken();
      this.AuthStoreService.deleteUserId();
      return true;
    }
    return false;
  }
}
