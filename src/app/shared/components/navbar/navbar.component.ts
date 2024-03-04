import { Component, OnInit } from "@angular/core";
import {
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { UserStoreService } from "src/app/user/services/user-store.service";
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
    private userStoreService: UserStoreService,
    private userService: UserService
  ) {}
  userRoleIn(allowedRoles: Role[]): Observable<boolean> {
    const id = this.userStoreService.getUserId();
    if (!id) return of(false);

    return this.userService
      .getUserById(id)
      .pipe(map((user) => Boolean(user && allowedRoles.includes(user.role))));
  }

  haIniciatSessio() {
    return this.userStoreService.isUsuariAutenticat();
  }
}
