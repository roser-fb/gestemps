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
import { PeriodeFestiusService } from "../services/periode-festius.service";
import * as PeriodeFestiusAction from "../actions/periode-festius.actions";

@Injectable()
export class PeriodeFestiusEffects {
  constructor(
    private actions$: Actions,
    private festiusService: PeriodeFestiusService,
    private router: Router
  ) {}

  getPeriodesFestius = createEffect(() =>
    this.actions$.pipe(
      ofType(PeriodeFestiusAction.getPeriodesFestius),
      exhaustMap(() =>
        this.festiusService.getPeriodesFestius().pipe(
          map((periodes) =>
            PeriodeFestiusAction.getPeriodesFestiusSuccess({
              periodes,
            })
          ),
          catchError((error) =>
            of(PeriodeFestiusAction.getPeriodesFestiusError({ error }))
          )
        )
      )
    )
  );

  createPeriodeFestius$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeriodeFestiusAction.createPeriodeFestius),
      exhaustMap(({ periode }) =>
        this.festiusService.create(periode).pipe(
          map((periode) => {
            return PeriodeFestiusAction.createPeriodeFestiusSuccess({
              periode,
            });
          }),
          catchError((error) => {
            return of(
              PeriodeFestiusAction.createPeriodeFestiusError({ error })
            );
          }),
          finalize(async () => {})
        )
      )
    )
  );

  createPeriodeFestiussuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PeriodeFestiusAction.createPeriodeFestiusSuccess),
        map(() => {})
      ),
    { dispatch: false }
  );
  createPeriodeFestiusError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PeriodeFestiusAction.createPeriodeFestiusError),
        map((error) => {})
      ),
    { dispatch: false }
  );

  getPeriodeFestiusById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeriodeFestiusAction.getPeriodeFestiusById),
      exhaustMap(({ id }) =>
        this.festiusService.getPeriodeFestiusById(id).pipe(
          map((periode) =>
            PeriodeFestiusAction.getPeriodeFestiusByIdSuccess({
              periode,
            })
          ),
          catchError((error) =>
            of(PeriodeFestiusAction.getPeriodeFestiusByIdError({ error }))
          )
        )
      )
    )
  );

  updatePeriodeFestiusSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PeriodeFestiusAction.updatePeriodeFestiusSuccess),
        map(() => {})
      ),
    { dispatch: false }
  );
  updatePeriodeFestiusError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PeriodeFestiusAction.updatePeriodeFestiusError),
        map((error) => {})
      ),
    { dispatch: false }
  );

  deletePeriodeFestius$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeriodeFestiusAction.deletePeriodeFestius),
      exhaustMap(({ id }) =>
        this.festiusService.delete(id).pipe(
          map(() => PeriodeFestiusAction.deletePeriodeFestiusSuccess()),
          catchError((error) =>
            of(PeriodeFestiusAction.deletePeriodeFestiusError({ error }))
          )
        )
      )
    )
  );

  deletePeriodeFestiusError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PeriodeFestiusAction.deletePeriodeFestiusError),
        map((error) => {})
      ),
    { dispatch: false }
  );
}
