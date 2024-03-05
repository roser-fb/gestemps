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
import { User } from "src/app/user/models/user.dto";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  faUser = faUser;
  faCalendarDays = faCalendarDays;
  faArrowRightFromBracket = faArrowRightFromBracket;
  constructor(
    private AuthStoreService: AuthStoreService,
    private userService: UserService
  ) {}
  userRoleIn(allowedRoles: Role[]): boolean {
    const id = this.AuthStoreService.getUserId();
    let res = false;
    if (!id) return res;
    this.userService.getUserById(id).pipe(
      map((user) => {
        if(user)
        res = Boolean(user && allowedRoles.includes(user.role));
      })
    ); 
    return res;
  }

  haIniciatSessio() {
    return this.AuthStoreService.isUsuariAutenticat();
  }
}
