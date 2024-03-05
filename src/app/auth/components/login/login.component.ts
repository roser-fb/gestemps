import { Component } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthStoreService } from "../../services/auth-store.service";
import { AuthService } from "../../services/auth.service";

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
    private authService: AuthService,
    private AuthStoreService: AuthStoreService,
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
      this.authService.login(this.loginForm.value).subscribe(
        (result: any) => {
          this.message = result.msg;
          this.AuthStoreService.setToken(result.token);
          this.AuthStoreService.setUserId(result.user);
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
