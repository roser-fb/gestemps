import { IfStmt } from "@angular/compiler";
import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthStoreService } from "src/app/auth/services/auth-store.service";
import { Role } from "../../models/roles.dto";
import { User } from "../../models/user.dto";
import { UserService } from "../../services/user.service";
import { PasswordValidator } from "../../validators/password-validator";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent {
  profileForm!: FormGroup;
  changePasswordForm!: FormGroup;
  editProfile: boolean = false;
  changePassword: boolean = false;
  submitted: boolean = false;
  isAdmin: boolean | null = null;
  user: User = new User("", "", "", "", Role.User, "");
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authStoreService: AuthStoreService
  ) {
    this.profileForm = this.formBuilder.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      img: ["user1", [Validators.required]],
    });
    this.changePasswordForm = this.formBuilder.group(
      {
        currentPassword: ["", Validators.required],
        newPassword: ["", Validators.required],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: [
          PasswordValidator.passwordValidator,
          PasswordValidator.newPasswordValidator,
        ],
      }
    );
  }
  ngOnInit() {
    const id = this.authStoreService.getUserId();
    if (id)
      this.userService.getUserById(id).subscribe((user) => {
        if (user) this.user = user;
        this.isAdmin = this.user.role == Role.Admin;
        this.profileForm = this.formBuilder.group({
          username: [this.user.username, Validators.required],
          email: [this.user.mail, [Validators.required, Validators.email]],
          img: [this.user.img, [Validators.required]],
        });
      });
  }
  openModal(type: string) {
    if (type == "profile") {
      this.editProfile = true;
      this.changePassword = false;
    }
    if (type == "password") {
      this.editProfile = false;
      this.changePassword = true;
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.profileForm.valid && this.editProfile) {
      this.user.mail = this.profileForm.value.email;
      this.user.username = this.profileForm.value.username;
      this.user.img = this.profileForm.value.img;
      this.userService.updateUser(this.user.id, this.user).subscribe((res) => {
        console.log(res);
        if (res.affectedRows > 0) {
          location.reload();
        }
      });
    }
    if (this.changePasswordForm.valid && this.changePassword) {
      this.user.password = this.profileForm.value.newPassword;
      this.userService.updateUser(this.user.id, this.user).subscribe((res) => {
        if (res.affectedRows > 0) {
          location.reload();
        }
      });
    }
  }
  range(length: number): string[] {
    return Array.from({ length }, (_, index) => "user" + (index + 1));
  }
}
