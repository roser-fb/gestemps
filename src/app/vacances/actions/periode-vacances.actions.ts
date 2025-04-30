import { createAction, props } from "@ngrx/store";
import { PeriodeVacances } from "../models/periode-vacances.dto";

export const getPeriodesVacances = createAction(
  "[VACANCES] Get PeriodesVacances"
);
export const getPeriodeVacancesById = createAction(
  "[VACANCES] Get periode by id",
  props<{ id: string }>()
);
export const createPeriodeVacances = createAction(
  "[VACANCES] crea periode",
  props<{ periode: PeriodeVacances; num_dies: number }>()
);
export const updatePeriodeVacances = createAction(
  "[VACANCES] Update periode",
  props<{ id: string; periode: PeriodeVacances }>()
);

export const deletePeriodeVacances = createAction(
  "[VACANCES] Delete periode",
  props<{ id: string }>()
);

export const getPeriodesVacancesSuccess = createAction(
  "[VACANCES] Get PeriodesVacances Success",
  props<{ periodes: PeriodeVacances[] }>()
);

export const getPeriodesVacancesError = createAction(
  "[VACANCES] Get PeriodesVacances Error",
  props<{ error: any }>()
);

export const getPeriodeVacancesByIdSuccess = createAction(
  "[VACANCES] Get PeriodesVacances by id Success",
  props<{ periode: PeriodeVacances | undefined }>()
);

export const getPeriodeVacancesByIdError = createAction(
  "[VACANCES] Get PeriodesVacances by id Error",
  props<{ error: any }>()
);

export const createPeriodeVacancesSuccess = createAction(
  "[VACANCES] Create periode Success",
  props<{ periode: PeriodeVacances }>()
);

export const createPeriodeVacancesError = createAction(
  "[VACANCES] Create periode Error",
  props<{ error: any }>()
);

export const updatePeriodeVacancesSuccess = createAction(
  "[VACANCES] Update periode Success",
  props<{ periode: PeriodeVacances }>()
);

export const updatePeriodeVacancesError = createAction(
  "[VACANCES] Update periode Error",
  props<{ error: any }>()
);

export const deletePeriodeVacancesSuccess = createAction(
  "[VACANCES] Delete periode Success"
);

export const deletePeriodeVacancesError = createAction(
  "[VACANCES] Delete periode Error",
  props<{ error: any }>()
);
