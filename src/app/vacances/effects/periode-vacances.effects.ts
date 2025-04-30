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
import { PeriodeVacancesService } from "../services/periode-vacances.service";
import * as PeriodeVacancesAction from "../actions/periode-vacances.actions";

@Injectable()
export class PeriodeVacancesEffects {
  constructor(
    private actions$: Actions,
    private disponibleService: PeriodeVacancesService,
    private router: Router
  ) {}

  getPeriodesVacances$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeriodeVacancesAction.getPeriodesVacances),
      exhaustMap(() =>
        this.disponibleService.getPeriodeVacances().pipe(
          map((periodes) =>
            PeriodeVacancesAction.getPeriodesVacancesSuccess({
              periodes,
            })
          ),
          catchError((error) =>
            of(PeriodeVacancesAction.getPeriodesVacancesError({ error }))
          )
        )
      )
    )
  );

  createPeriodeVacances$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeriodeVacancesAction.createPeriodeVacances),
      exhaustMap(({ periode, num_dies }) =>
        this.disponibleService.create(periode, num_dies).pipe(
          map((periode) => {
            return PeriodeVacancesAction.createPeriodeVacancesSuccess({
              periode,
            });
          }),
          catchError((error) => {
            return of(
              PeriodeVacancesAction.createPeriodeVacancesError({ error })
            );
          }),
          finalize(async () => {})
        )
      )
    )
  );

  createPeriodesVacancessuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PeriodeVacancesAction.createPeriodeVacancesSuccess),
        map(() => {})
      ),
    { dispatch: false }
  );
  createPeriodeVacancesError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PeriodeVacancesAction.createPeriodeVacancesError),
        map((error) => {})
      ),
    { dispatch: false }
  );

  getPeriodeVacancesById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeriodeVacancesAction.getPeriodeVacancesById),
      exhaustMap(({ id }) =>
        this.disponibleService.getPeriodeVacancesById(id).pipe(
          map((periode) =>
            PeriodeVacancesAction.getPeriodeVacancesByIdSuccess({
              periode,
            })
          ),
          catchError((error) =>
            of(PeriodeVacancesAction.getPeriodeVacancesByIdError({ error }))
          )
        )
      )
    )
  );

  updatePeriodeVacancesSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PeriodeVacancesAction.updatePeriodeVacancesSuccess),
        map(() => {})
      ),
    { dispatch: false }
  );
  updatePeriodeVacancesError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PeriodeVacancesAction.updatePeriodeVacancesError),
        map((error) => {})
      ),
    { dispatch: false }
  );

  deletePeriodeVacances$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeriodeVacancesAction.deletePeriodeVacances),
      exhaustMap(({ id }) =>
        this.disponibleService.delete(id).pipe(
          map(() => PeriodeVacancesAction.deletePeriodeVacancesSuccess()),
          catchError((error) =>
            of(PeriodeVacancesAction.deletePeriodeVacancesError({ error }))
          )
        )
      )
    )
  );

  deletePeriodeVacancesError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PeriodeVacancesAction.deletePeriodeVacancesError),
        map((error) => {})
      ),
    { dispatch: false }
  );
}
