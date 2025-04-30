import { createAction, props } from "@ngrx/store";
import { Guardia } from "../models/guardies.dto";

export const getGuardies = createAction("[VACANCES] Get Guardies");
export const getGuardiaById = createAction(
  "[VACANCES] Get periodeVacanca by id",
  props<{ id: string }>()
);
export const createGuardia = createAction(
  "[VACANCES] crea guardia",
  props<{ guardia: Guardia; festiu: number }>()
);
export const updateGuardia = createAction(
  "[VACANCES] Update guardia",
  props<{ id: string; guardia: Guardia }>()
);

export const deleteGuardia = createAction(
  "[VACANCES] Delete guardia",
  props<{ id: string }>()
);

export const getGuardiesSuccess = createAction(
  "[VACANCES] Get Guardies Success",
  props<{ guardies: Guardia[] }>()
);

export const getGuardiesError = createAction(
  "[VACANCES] Get Guardies Error",
  props<{ error: any }>()
);

export const getGuardiaByIdSuccess = createAction(
  "[VACANCES] Get Guardia by id Success",
  props<{ guardia: Guardia | undefined }>()
);

export const getGuardiaByIdError = createAction(
  "[VACANCES] Get Guardia by id Error",
  props<{ error: any }>()
);

export const createGuardiaSuccess = createAction(
  "[VACANCES] Create guardia Success",
  props<{ guardia: Guardia }>()
);

export const createGuardiaError = createAction(
  "[VACANCES] Create guardia Error",
  props<{ error: any }>()
);

export const updateGuardiaSuccess = createAction(
  "[VACANCES] Update guardia Success",
  props<{ guardia: Guardia }>()
);

export const updateGuardiaError = createAction(
  "[VACANCES] Update guardia Error",
  props<{ error: any }>()
);

export const deleteGuardiaSuccess = createAction(
  "[VACANCES] Delete guardia Success"
);

export const deleteGuardiaError = createAction(
  "[VACANCES] Delete guardia Error",
  props<{ error: any }>()
);
