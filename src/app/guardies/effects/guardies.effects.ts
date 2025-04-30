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
import { GuardiesService } from "../services/guardies.service";
import * as GuardiesAction from "../actions/guardies.actions";

@Injectable()
export class GuardiesEffects {
  constructor(
    private actions$: Actions,
    private guardiesService: GuardiesService,
    private router: Router
  ) {}

  getGuardies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GuardiesAction.getGuardies),
      exhaustMap(() =>
        this.guardiesService.getGuardies().pipe(
          map((guardies) =>
            GuardiesAction.getGuardiesSuccess({
              guardies,
            })
          ),
          catchError((error) => of(GuardiesAction.getGuardiesError({ error })))
        )
      )
    )
  );

  createGuardia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GuardiesAction.createGuardia),
      exhaustMap(({ guardia, festiu }) =>
        this.guardiesService.create(guardia, festiu).pipe(
          map((guardia) => {
            return GuardiesAction.createGuardiaSuccess({
              guardia,
            });
          }),
          catchError((error) => {
            return of(GuardiesAction.createGuardiaError({ error }));
          }),
          finalize(async () => {})
        )
      )
    )
  );

  createGuardiasuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GuardiesAction.createGuardiaSuccess),
        map(() => {})
      ),
    { dispatch: false }
  );
  createGuardiaError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GuardiesAction.createGuardiaError),
        map((error) => {})
      ),
    { dispatch: false }
  );

  getGuardiaById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GuardiesAction.getGuardiaById),
      exhaustMap(({ id }) =>
        this.guardiesService.getGuardiaById(id).pipe(
          map((guardia) =>
            GuardiesAction.getGuardiaByIdSuccess({
              guardia,
            })
          ),
          catchError((error) =>
            of(GuardiesAction.getGuardiaByIdError({ error }))
          )
        )
      )
    )
  );

  updateGuardiaSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GuardiesAction.updateGuardiaSuccess),
        map(() => {})
      ),
    { dispatch: false }
  );
  updateGuardiaError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GuardiesAction.updateGuardiaError),
        map((error) => {})
      ),
    { dispatch: false }
  );

  deleteGuardia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GuardiesAction.deleteGuardia),
      exhaustMap(({ id }) =>
        this.guardiesService.delete(id).pipe(
          map(() => GuardiesAction.deleteGuardiaSuccess()),
          catchError((error) =>
            of(GuardiesAction.deleteGuardiaError({ error }))
          )
        )
      )
    )
  );

  deleteGuardiaError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GuardiesAction.deleteGuardiaError),
        map((error) => {})
      ),
    { dispatch: false }
  );
}
