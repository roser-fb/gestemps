import { Component, OnInit } from "@angular/core";
import {
  faUser,
  faArrowRightFromBracket,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { AuthStoreService } from "src/app/auth/services/auth-store.service";
import { UserService } from "src/app/user/services/user.service";
import { Observable, map, of } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { Role } from "src/app/user/models/roles.dto";
import { User } from "src/app/user/models/user.dto";
import * as HeaderSelectors from "../../selectors";
import * as HeaderAction from "../../actions";

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
  imatge: string | null = null;
  faSignOut = faSignOut;
  user_id: string | null = null;
  token: string | null = null;
  rol: string | null = null;
  isOpen: boolean = false;
  user: User;
  showNoAuthSection$: Observable<boolean>;
  showAuthSection$: Observable<boolean>;
  showGestorSection$: Observable<boolean>;
  showAdminSection$: Observable<boolean>;

  constructor(
    private authStoreService: AuthStoreService,
    private userService: UserService,
    private store: Store<AppState>
  ) {
    this.user = new User("", "", "", "", Role.USER, "");
    this.showNoAuthSection$ = this.store.select(
      HeaderSelectors.selectShowNoAuthSection
    );
    this.showAuthSection$ = this.store.select(
      HeaderSelectors.selectShowAuthSection
    );
    this.showGestorSection$ = this.store.select(
      HeaderSelectors.selectShowGestorSection
    );
    this.showAdminSection$ = this.store.select(
      HeaderSelectors.selectShowAdminSection
    );
  }
  ngOnInit(): void {
    this.token = this.authStoreService.get("token");
    this.user_id = this.authStoreService.get("user_id");
    this.rol = this.authStoreService.get("rol");

    this.imatge = this.authStoreService.get("user_img");

    this.comprovaToken();
    this.comprovaRol();
  }

  comprovaToken() {
    if (this.token) {
      this.store.dispatch(HeaderAction.toggleAuthSection({ show: true }));
      this.store.dispatch(HeaderAction.toggleNoAuthSection({ show: false }));
    }
  }
  comprovaRol() {
    if (this.token && this.rol == Role.GESTOR) {
      this.store.dispatch(HeaderAction.toggleGestorSection({ show: true }));
      this.store.dispatch(HeaderAction.toggleAdminSection({ show: false }));
    }
    if (this.token && this.rol == Role.ADMIN) {
      this.store.dispatch(HeaderAction.toggleGestorSection({ show: true }));
      this.store.dispatch(HeaderAction.toggleAdminSection({ show: true }));
    }
  }
}
