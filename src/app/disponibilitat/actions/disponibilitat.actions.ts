import { createAction, props } from "@ngrx/store";
import { PeriodeDisponible } from "../models/periode-disponible.dto";

export const getPeriodeDisponible = createAction(
  "[USUARI] Get PeriodesDisponibles"
);
export const getPeriodeDisponibleById = createAction(
  "[USUARI] Get periodeDisponible by id",
  props<{ id: string }>()
);
export const createPeriodeDisponible = createAction(
  "[USUARI] crea periodeDisponible",
  props<{ periodeDisponible: PeriodeDisponible }>()
);
export const updatePeriodeDisponible = createAction(
  "[USUARI] Update periodeDisponible",
  props<{ id: string; periodeDisponible: PeriodeDisponible }>()
);
export const newPassword = createAction(
  "[USUARI] Update contrasenya",
  props<{ id: string; periodeDisponible: PeriodeDisponible }>()
);
export const updateRol = createAction(
  "[USUARI] Update rol",
  props<{ id: string; periodeDisponible: PeriodeDisponible }>()
);
export const deletePeriodeDisponible = createAction(
  "[USUARI] Delete periodeDisponible",
  props<{ id: string }>()
);

export const getPeriodeDisponibleSuccess = createAction(
  "[USUARI] Get PeriodesDisponibles Success",
  props<{ periodeDisponible: PeriodeDisponible[] }>()
);

export const getPeriodeDisponibleError = createAction(
  "[USUARI] Get PeriodesDisponibles Error",
  props<{ error: any }>()
);

export const getPeriodeDisponibleByIdSuccess = createAction(
  "[USUARI] Get PeriodesDisponibles by id Success",
  props<{ periodeDisponible: PeriodeDisponible | undefined }>()
);

export const getPeriodeDisponibleByIdError = createAction(
  "[USUARI] Get PeriodesDisponibles by id Error",
  props<{ error: any }>()
);

export const createPeriodeDisponibleSuccess = createAction(
  "[USUARI] Create periodeDisponible Success",
  props<{ periodeDisponible: PeriodeDisponible }>()
);

export const createPeriodeDisponibleError = createAction(
  "[USUARI] Create periodeDisponible Error",
  props<{ error: any }>()
);

export const newPasswordSuccess = createAction(
  "[USUARI] Update contrasenya Success",
  props<{ periodeDisponible: PeriodeDisponible }>()
);

export const newPasswordError = createAction(
  "[USUARI] Update contrasenya Error",
  props<{ error: any }>()
);
export const updateRolSuccess = createAction(
  "[USUARI] Update rol Success",
  props<{ periodeDisponible: PeriodeDisponible }>()
);

export const updateRolError = createAction(
  "[USUARI] Update rol Error",
  props<{ error: any }>()
);
export const updatePeriodesDisponiblesuccess = createAction(
  "[USUARI] Update periodeDisponible Success",
  props<{ periodeDisponible: PeriodeDisponible }>()
);

export const updatePeriodeDisponibleError = createAction(
  "[USUARI] Update periodeDisponible Error",
  props<{ error: any }>()
);

export const deletePeriodesDisponiblesuccess = createAction(
  "[USUARI] Delete periodeDisponible Success"
);

export const deletePeriodeDisponibleError = createAction(
  "[USUARI] Delete periodeDisponible Error",
  props<{ error: any }>()
);
