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
import { DisponibleService } from "../services/disponible.service";
import * as PeriodeDisponibleAction from "../actions/disponibilitat.actions";

@Injectable()
export class PeriodeDisponibleEffects {
  constructor(
    private actions$: Actions,
    private disponibleService: DisponibleService,
    private router: Router
  ) {}

  getPeriodeDisponible$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeriodeDisponibleAction.getPeriodeDisponible),
      exhaustMap(() =>
        this.disponibleService.getPeriodeDisponible().pipe(
          map((periodeDisponible) =>
            PeriodeDisponibleAction.getPeriodeDisponibleSuccess({
              periodeDisponible,
            })
          ),
          catchError((error) =>
            of(PeriodeDisponibleAction.getPeriodeDisponibleError({ error }))
          )
        )
      )
    )
  );

  createPeriodeDisponible$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeriodeDisponibleAction.createPeriodeDisponible),
      exhaustMap(({ periodeDisponible }) =>
        this.disponibleService.create(periodeDisponible).pipe(
          map((periodeDisponible) => {
            return PeriodeDisponibleAction.createPeriodeDisponibleSuccess({
              periodeDisponible,
            });
          }),
          catchError((error) => {
            return of(
              PeriodeDisponibleAction.createPeriodeDisponibleError({ error })
            );
          }),
          finalize(async () => {})
        )
      )
    )
  );

  createPeriodesDisponiblesuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PeriodeDisponibleAction.createPeriodeDisponibleSuccess),
        map(() => {})
      ),
    { dispatch: false }
  );
  createPeriodeDisponibleError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PeriodeDisponibleAction.createPeriodeDisponibleError),
        map((error) => {})
      ),
    { dispatch: false }
  );

  getPeriodeDisponibleById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeriodeDisponibleAction.getPeriodeDisponibleById),
      exhaustMap(({ id }) =>
        this.disponibleService.getPeriodeDisponibleById(id).pipe(
          map((periodeDisponible) =>
            PeriodeDisponibleAction.getPeriodeDisponibleByIdSuccess({
              periodeDisponible,
            })
          ),
          catchError((error) =>
            of(PeriodeDisponibleAction.getPeriodeDisponibleByIdError({ error }))
          )
        )
      )
    )
  );

  updatePeriodesDisponiblesuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PeriodeDisponibleAction.updatePeriodesDisponiblesuccess),
        map(() => {})
      ),
    { dispatch: false }
  );
  updatePeriodeDisponibleError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PeriodeDisponibleAction.updatePeriodeDisponibleError),
        map((error) => {})
      ),
    { dispatch: false }
  );

  deletePeriodeDisponible$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeriodeDisponibleAction.deletePeriodeDisponible),
      exhaustMap(({ id }) =>
        this.disponibleService.delete(id).pipe(
          map(() => PeriodeDisponibleAction.deletePeriodesDisponiblesuccess()),
          catchError((error) =>
            of(PeriodeDisponibleAction.deletePeriodeDisponibleError({ error }))
          )
        )
      )
    )
  );

  deletePeriodeDisponibleError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PeriodeDisponibleAction.deletePeriodeDisponibleError),
        map((error) => {})
      ),
    { dispatch: false }
  );
}
