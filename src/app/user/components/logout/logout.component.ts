import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthStoreService } from "../../../auth/services/auth-store.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import * as HeaderAction from "../../../shared/actions";

@Component({
  selector: "app-logout",
  template: "",
})
export class LogoutComponent implements OnInit {
  constructor(
    private authStoreService: AuthStoreService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.authStoreService.delete("token");
    this.authStoreService.delete("user_id");
    this.authStoreService.delete("rol");
    this.authStoreService.delete("user_img");

    this.store.dispatch(HeaderAction.toggleNoAuthSection({ show: true }));
    this.store.dispatch(HeaderAction.toggleAuthSection({ show: false }));
    this.store.dispatch(HeaderAction.toggleGestorSection({ show: false }));
    this.store.dispatch(HeaderAction.toggleAdminSection({ show: false }));

    this.router.navigateByUrl("/");
  }
}
