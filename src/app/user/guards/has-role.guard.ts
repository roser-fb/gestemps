import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { map, Observable } from "rxjs";
import { UserService } from "../services/user.service";
import { UserStoreService } from "../services/user-store.service";
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: "root",
})
export class HasRoleGuard implements CanActivate {
  constructor(
    private userStoreService: UserStoreService,
    private userService: UserService,
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
    const allowedRoles = route.data?.["allowedRoles"];
    const id = this.userStoreService.getUserId();
    if (id && !this.tokenCaducat()) {
      return this.userService
        .getUserById(id)
        .pipe(map((user) => Boolean(user && allowedRoles.includes(user.role))));
    }
    return false && alert("Acceso Denegado");
  }

  tokenCaducat() {
    const token = this.userStoreService.getToken();
    if (this.jwtHelper.isTokenExpired(token)) {
      this.userStoreService.deleteToken();
      this.userStoreService.deleteUserId();
      return true;
    }
    return false;
  }
}
