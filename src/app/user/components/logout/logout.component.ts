import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthStoreService } from "../../../auth/services/auth-store.service";

@Component({
  selector: "app-logout",
  template: "",
})
export class LogoutComponent implements OnInit {
  constructor(
    private AuthStoreService: AuthStoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.AuthStoreService.deleteToken();
    this.AuthStoreService.deleteUserId();
    this.router.navigate(["login"]);
  }
}
