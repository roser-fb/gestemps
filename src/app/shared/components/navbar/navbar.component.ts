import { Component, OnInit } from "@angular/core";
import {
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { AuthStoreService } from "src/app/auth/services/auth-store.service";
import { UserService } from "src/app/user/services/user.service";
import { Observable, map, of } from "rxjs";
import { Role } from "src/app/user/models/roles.dto";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  faUser = faUser;
  faCalendarDays = faCalendarDays;
  faArrowRightFromBracket = faArrowRightFromBracket;
  Role = Role;
  constructor(
    private AuthStoreService: AuthStoreService,
    private userService: UserService
  ) {}
  userRoleIn(allowedRoles: Role[]): boolean {
    const id = this.AuthStoreService.getUserId();
    let res = false;
    let usera = "";
    let aRoles;
    let uRole;
    if (!id) return res;
    this.userService.getUserById(id).pipe(
      map((user) => {
        usera = user;
        aRoles = allowedRoles;
        uRole = user.role;
        res = Boolean(user && allowedRoles.includes(user.role));
      })
    );
    console.log(res);
    console.log(usera);
    console.log(aRoles);
    console.log(uRole);    
    return res;
  }

  haIniciatSessio() {
    return this.AuthStoreService.isUsuariAutenticat();
  }
}
