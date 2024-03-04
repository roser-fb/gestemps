import { Component } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserStoreService } from "../../services/user-store.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  public loginForm!: FormGroup;
  public submitted = false;
  public message = null;

  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService,
    private userStoreService: UserStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.creaFormulari();
  }
  creaFormulari() {
    this.loginForm = this.formbuilder.group({
      username: [null, Validators.required],
      password: [null, [Validators.required]],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        (result: any) => {
          this.message = result.msg;
          this.userStoreService.setToken(result.token);
          this.userStoreService.setUserId(result.user);
          this.router.navigate(["/"]);
        },
        (err) => {
          this.message = err.error.msg;
        }
      );
    } else {
      console.log("El formulari és invàlid");
    }
  }
}
