import { Component } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { Role } from "../../models/roles.dto";
import { User } from "../../models/user.dto";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.css"],
})
export class RegisterFormComponent {
  public registerForm!: FormGroup;
  public submitted = false;
  public checked = false;
  public message = null;
  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService
  ) {
    this.creaFormulari();
  }
  ngOnInit() {
    this.userService.submitEvent.subscribe(() => {
      location.reload();
    });
  }
  creaFormulari() {
    this.registerForm = this.formbuilder.group({
      username: [null, Validators.required],
      mail: [null, Validators.required],
      role: [],
      img: ["user1", Validators.required],
    });
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.checked);
    if (this.registerForm.valid) {
      let newuser: User = this.registerForm.value;
      newuser.password = this.userService.newPassword(newuser.username);
      newuser.role = Role.USER;
      if (this.checked) newuser.role = Role.ADMIN;
      this.userService.register(newuser).subscribe(
        (result: any) => {
          this.message = result.msg;
          location.reload();
        },
        (err) => {
          this.message = err.error.msg;
        }
      );
    } else {
      console.log("El formulari és invàlid");
    }
  }
  changeChecked(): void {
    this.checked = !this.checked;
  }
  range(length: number): string[] {
    return Array.from({ length }, (_, index) => "user" + (index + 1));
  }
}
