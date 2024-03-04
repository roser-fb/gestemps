import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserStoreService } from "../../services/user-store.service";

@Component({
  selector: "app-logout",
  template: "",
})
export class LogoutComponent implements OnInit {
  constructor(
    private userStoreService: UserStoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userStoreService.deleteToken();
    this.userStoreService.deleteUserId();
    this.router.navigate(["login"]);
  }
}
