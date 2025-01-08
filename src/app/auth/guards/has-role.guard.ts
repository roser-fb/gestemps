import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { map, Observable } from "rxjs";
import { UserService } from "../../user/services/user.service";
import { AuthStoreService } from "../services/auth-store.service";
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: "root",
})
export class HasRoleGuard implements CanActivate {
  constructor(
    private AuthStoreService: AuthStoreService,
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
    const id = this.AuthStoreService.get("user_id");
    if (id && !this.tokenCaducat()) {
      return this.userService.getUserById(id).pipe(
        map((user) => {
          console.log(user);
          console.log(allowedRoles);
          return Boolean(user && allowedRoles.includes(user.role));
        })
      );
    }
    return false && alert("Accés Denegat");
  }

  tokenCaducat() {
    const token = this.AuthStoreService.get("token");
    if (this.jwtHelper.isTokenExpired(token)) {
      this.AuthStoreService.delete("token");
      this.AuthStoreService.delete("user_id");
      return true;
    }
    return false;
  }
}
