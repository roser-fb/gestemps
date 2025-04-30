import { createAction, props } from "@ngrx/store";
import { PeriodeFestius } from "../models/periode-festius.dto";

export const getPeriodesFestius = createAction("[FESTIUS] Get PeriodesFestius");
export const getPeriodeFestiusById = createAction(
  "[FESTIUS] Get periodeVacanca by id",
  props<{ id: string }>()
);
export const createPeriodeFestius = createAction(
  "[FESTIUS] crea periodeFestiu",
  props<{ periode: PeriodeFestius }>()
);
export const updatePeriodeFestius = createAction(
  "[FESTIUS] Update periodeFestiu",
  props<{ id: string; periode: PeriodeFestius }>()
);

export const deletePeriodeFestius = createAction(
  "[FESTIUS] Delete periodeFestiu",
  props<{ id: string }>()
);

export const getPeriodesFestiusSuccess = createAction(
  "[FESTIUS] Get PeriodesFestius Success",
  props<{ periodes: PeriodeFestius[] }>()
);

export const getPeriodesFestiusError = createAction(
  "[FESTIUS] Get PeriodesFestius Error",
  props<{ error: any }>()
);

export const getPeriodeFestiusByIdSuccess = createAction(
  "[FESTIUS] Get PeriodeFestius by id Success",
  props<{ periode: PeriodeFestius | undefined }>()
);

export const getPeriodeFestiusByIdError = createAction(
  "[FESTIUS] Get PeriodeFestius by id Error",
  props<{ error: any }>()
);

export const createPeriodeFestiusSuccess = createAction(
  "[FESTIUS] Create periodeFestiu Success",
  props<{ periode: PeriodeFestius }>()
);

export const createPeriodeFestiusError = createAction(
  "[FESTIUS] Create periodeFestiu Error",
  props<{ error: any }>()
);

export const updatePeriodeFestiusSuccess = createAction(
  "[FESTIUS] Update periodeFestiu Success",
  props<{ periode: PeriodeFestius }>()
);

export const updatePeriodeFestiusError = createAction(
  "[FESTIUS] Update periodeFestiu Error",
  props<{ error: any }>()
);

export const deletePeriodeFestiusSuccess = createAction(
  "[FESTIUS] Delete periodeFestiu Success"
);

export const deletePeriodeFestiusError = createAction(
  "[FESTIUS] Delete periodeFestiu Error",
  props<{ error: any }>()
);
