import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  exhaustMap,
  map,
  catchError,
  of,
  tap,
  switchMap,
  finalize,
} from "rxjs";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import * as UserAction from "../actions/user.actions";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAction.getUsers),
      exhaustMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UserAction.getUsersSuccess({ users })),
          catchError((error) => of(UserAction.getUsersError({ error })))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAction.createUser),
      exhaustMap(({ user }) =>
        this.userService.register(user).pipe(
          map((user) => {
            return UserAction.createUserSuccess({ user });
          }),
          catchError((error) => {
            return of(UserAction.createUserError({ error }));
          }),
          finalize(async () => {})
        )
      )
    )
  );

  createUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserAction.createUserSuccess),
        map(() => {})
      ),
    { dispatch: false }
  );
  createUserError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserAction.createUserError),
        map((error) => {})
      ),
    { dispatch: false }
  );

  getUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAction.getUserById),
      exhaustMap(({ id }) =>
        this.userService.getUserById(id).pipe(
          map((user) => UserAction.getUserByIdSuccess({ user })),
          catchError((error) => of(UserAction.getUserByIdError({ error })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAction.updateUser),
      exhaustMap((action) =>
        this.userService.updateUser(action.id, action.user).pipe(
          map((user) => UserAction.updateUserSuccess({ user })),
          catchError((error) => of(UserAction.updateUserError({ error }))),
          finalize(async () => {})
        )
      )
    )
  );
  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserAction.updateUserSuccess),
        map(() => {})
      ),
    { dispatch: false }
  );
  updateUserError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserAction.updateUserError),
        map((error) => {})
      ),
    { dispatch: false }
  );
  /** 
  newPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAction.newPassword),
      exhaustMap((action) =>
        this.userService.newPassword(action.user).pipe(
          map((user) => UserAction.newPasswordSuccess({ user })),
          catchError((error) =>
            of(UserAction.newPasswordError({ error }))
          ),
          finalize(async () => {})
        )
      )
    )
  );
  newPasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserAction.newPasswordSuccess),
        map(() => {})
      ),
    { dispatch: false }
  );
  newPasswordError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserAction.newPasswordError),
        map((error) => {})
      ),
    { dispatch: false }
  );
 updateRol$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAction.updateRol),
      exhaustMap((action) =>
        this.userService.updateRol(action.id, action.user).pipe(
          map((user) => UserAction.updateRolSuccess({ user })),
          catchError((error) => of(UserAction.updateRolError({ error }))),
          finalize(async () => {})
        )
      )
    )
  );
  updateRolSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserAction.updateRolSuccess),
        map(() => {})
      ),
    { dispatch: false }
  );
  updateRolError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserAction.updateRolError),
        map((error) => {})
      ),
    { dispatch: false }
  );*/

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAction.deleteUser),
      exhaustMap(({ id }) =>
        this.userService.deleteUser(id).pipe(
          map(() => UserAction.deleteUserSuccess()),
          catchError((error) => of(UserAction.deleteUserError({ error })))
        )
      )
    )
  );

  deleteUserError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserAction.deleteUserError),
        map((error) => {})
      ),
    { dispatch: false }
  );
}
