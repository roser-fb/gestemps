import { Component } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Role } from "../../models/roles.dto";
import { User } from "../../models/user.dto";
import { UserService } from "../../services/user.service";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent {
  public llista_usuaris$: Observable<User[]> = new Observable<User[]>();
  public checked = false;
  public passwordResetMessages$: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  faTrashCan = faTrashCan;
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.llista_usuaris$ = this.userService.getUser();
  }
  resetPassword(id: string, username: string) {
    const newPassword = this.userService.newPassword(username);
    this.userService.getUserById(id).subscribe((user) => {
      if (user) {
        user.password = newPassword;
        this.userService.updateUser(id, user);
      }
    });
  }

  randomPassword(): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
  esborra(id: string): void {
    this.userService.delete(id).subscribe((res) => {
      if (res.status == "ok") {
        location.reload();
      }
    });
  }
  isCkecked() {
    return !this.checked;
  }

  checkIfAdmin(role: string) {
    return role == Role.Admin;
  }
  changeRole(id: string) {
    this.userService.getUserById(id).subscribe((user) => {
      if (user) {
        if (user.role == Role.Admin) {
          user.role = Role.User;
        } else user.role = Role.Admin;
        this.userService.updateUser(id, user).subscribe((res) => {
          if (res.status == "ok") {
            location.reload();
          }
        });
      }
    });
  }
}
