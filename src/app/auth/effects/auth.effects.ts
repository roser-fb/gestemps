import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, of, finalize } from "rxjs";
import * as AuthAction from "../actions";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { Auth } from "../models/auth.dto";
import { AuthStoreService } from "../services/auth-store.service";
import { User } from "src/app/user/models/user.dto";

@Injectable()
export class AuthEffects {
  responseOK: boolean;

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private localStorageService: AuthStoreService,
    private router: Router
  ) {
    this.responseOK = false;
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.login),
      mergeMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((result) => {
            let authTemp: User = {
              id: result.user,
              username: result.username,
              mail: result.email,
              password: result.password,
              token: result.token,
              role: result.role,
              img: result.img,
            };
            console.log(authTemp);
            this.localStorageService.set("user_id", authTemp.id);
            if (authTemp.token)
              this.localStorageService.set("token", authTemp.token);
            this.localStorageService.set("rol", authTemp.role.toString());
            this.localStorageService.set("user_img", authTemp.img);
            return AuthAction.loginSuccess({ credentials: authTemp });
          }),
          catchError((error) => {
            return of(AuthAction.loginError({ error }));
          }),
          finalize(async () => {})
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthAction.loginSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );
  loginError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthAction.loginError),
        map((error) => {
          this.responseOK = false;
        })
      ),
    { dispatch: false }
  );
}
