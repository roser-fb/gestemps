import { Component } from "@angular/core";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
} from "@angular/forms";
import { Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { map, Observable } from "rxjs";
import { AuthStoreService } from "../../services/auth-store.service";
import { AuthService } from "../../services/auth.service";
import { AuthState } from "../../reducers";
import * as AuthAction from "../../actions";
import { Auth } from "../../models/auth.dto";
import * as HeaderAction from "../../../shared/actions";
import { Role } from "src/app/user/models/roles.dto";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginForm: UntypedFormGroup;
  username: UntypedFormControl;
  password: UntypedFormControl;
  loginUser: Auth;
  submitted: boolean = false;
  alerta: string | null = null;
  message: string | null = null;
  token: string | undefined = undefined;
  rol: string | null = null;
  isValidForm: boolean | null = null;
  public auth_estat$: Observable<AuthState>;

  responseOK$: Observable<boolean | null> = this.store
    .select("auth")
    .pipe(map(({ responseOK }) => responseOK));

  error$: Observable<any> = this.store
    .select("auth")
    .pipe(map(({ error }) => error));

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.auth_estat$ = this.store.select("auth");
    this.loginUser = new Auth("", "");
    this.username = new UntypedFormControl("", [Validators.required]);
    this.password = new UntypedFormControl("", [Validators.required]);
    this.loginForm = this.formBuilder.group({
      username: this.username,
      password: this.password,
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loginUser.username = this.username.value;
      this.loginUser.password = this.password.value;
      this.store.dispatch(AuthAction.login({ credentials: this.loginUser }));
      this.iniciaSessio();

      this.redirigeix();
    } else {
      this.message = "Ops! Revisa les dades";
    }
  }
  iniciaSessio() {
    this.store.select("auth").subscribe((auth) => {
      this.token = auth.credentials.token;
      this.comprovaRol();

      if (this.token) {
        this.store.dispatch(HeaderAction.toggleAuthSection({ show: true }));
        this.store.dispatch(HeaderAction.toggleNoAuthSection({ show: false }));
        this.alerta = "success";
        this.message = "Sessió iniciada correctament!";
        this.redirigeix();
      } else {
        this.alerta = "error";
        this.message =
          "Ops! Revisa les dades, l'usuari o contrasenya no és correcta";

        this.store.dispatch(HeaderAction.toggleAuthSection({ show: false }));
        this.store.dispatch(HeaderAction.toggleNoAuthSection({ show: true }));
      }
    });
  }
  comprovaRol(): void {
    if (this.token && this.rol == Role.GESTOR) {
      this.store.dispatch(HeaderAction.toggleGestorSection({ show: true }));
    }
    if (this.token && this.rol == Role.ADMIN) {
      this.store.dispatch(HeaderAction.toggleGestorSection({ show: true }));
      this.store.dispatch(HeaderAction.toggleAdminSection({ show: true }));
    }
  }

  redirigeix() {
    setTimeout(() => {
      this.router.navigateByUrl(this.authService.getUrl() || "/");
      this.alerta = null;
      this.message = null;
    }, 2000);
  }
}
