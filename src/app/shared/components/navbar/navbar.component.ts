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
import { Admin } from "mongodb";
import { TypeExpressionOperatorReturningBoolean } from "mongoose";

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
  isAdmin: boolean | null = null;
  constructor(
    private AuthStoreService: AuthStoreService,
    private userService: UserService
  ) {
    this.userRoleIn([Role.Admin]);
  }
  userRoleIn(allowedRole: Role[]) {
    const id = this.AuthStoreService.getUserId();
    if (id)
      this.userService
        .getUserById(id)
        .pipe(map((user) => Boolean(user && allowedRole.includes(user.role))))
        .subscribe((val) => (this.isAdmin = val));
  }
  haIniciatSessio() {
    return this.AuthStoreService.isUsuariAutenticat();
  }
}
