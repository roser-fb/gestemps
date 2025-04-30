import { createAction, props } from "@ngrx/store";
import { PeriodeDisponible } from "../models/periode-disponible.dto";

export const getPeriodeDisponible = createAction(
  "[DISPONIBLE] Get PeriodesDisponibles"
);
export const getPeriodeDisponibleById = createAction(
  "[DISPONIBLE] Get periodeDisponible by id",
  props<{ id: string }>()
);
export const getPeriodeDisponibleByYear = createAction(
  "[DISPONIBLE] Get periodeDisponible by year",
  props<{ year: number }>()
);
export const createPeriodeDisponible = createAction(
  "[DISPONIBLE] crea periodeDisponible",
  props<{ periodeDisponible: PeriodeDisponible }>()
);
export const updatePeriodeDisponible = createAction(
  "[DISPONIBLE] Update periodeDisponible",
  props<{ id: string; periodeDisponible: PeriodeDisponible }>()
);

export const deletePeriodeDisponible = createAction(
  "[DISPONIBLE] Delete periodeDisponible",
  props<{ id: string }>()
);

export const getPeriodeDisponibleSuccess = createAction(
  "[DISPONIBLE] Get PeriodesDisponibles Success",
  props<{ periodeDisponible: PeriodeDisponible[] }>()
);

export const getPeriodeDisponibleError = createAction(
  "[DISPONIBLE] Get PeriodesDisponibles Error",
  props<{ error: any }>()
);

export const getPeriodeDisponibleByIdSuccess = createAction(
  "[DISPONIBLE] Get PeriodesDisponibles by id Success",
  props<{ periodeDisponible: PeriodeDisponible | undefined }>()
);

export const getPeriodeDisponibleByIdError = createAction(
  "[DISPONIBLE] Get PeriodesDisponibles by id Error",
  props<{ error: any }>()
);

export const getPeriodeDisponibleByYearSuccess = createAction(
  "[DISPONIBLE] Get PeriodesDisponibles by year Success",
  props<{ periodeDisponible: PeriodeDisponible[] }>()
);

export const getPeriodeDisponibleByYearError = createAction(
  "[DISPONIBLE] Get PeriodesDisponibles by year Error",
  props<{ error: any }>()
);
export const createPeriodeDisponibleSuccess = createAction(
  "[DISPONIBLE] Create periodeDisponible Success",
  props<{ periodeDisponible: PeriodeDisponible }>()
);

export const createPeriodeDisponibleError = createAction(
  "[DISPONIBLE] Create periodeDisponible Error",
  props<{ error: any }>()
);

export const updatePeriodesDisponiblesuccess = createAction(
  "[DISPONIBLE] Update periodeDisponible Success",
  props<{ periodeDisponible: PeriodeDisponible }>()
);

export const updatePeriodeDisponibleError = createAction(
  "[DISPONIBLE] Update periodeDisponible Error",
  props<{ error: any }>()
);

export const deletePeriodesDisponiblesuccess = createAction(
  "[DISPONIBLE] Delete periodeDisponible Success"
);

export const deletePeriodeDisponibleError = createAction(
  "[DISPONIBLE] Delete periodeDisponible Error",
  props<{ error: any }>()
);
