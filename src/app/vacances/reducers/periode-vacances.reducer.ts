import { Action, createReducer, on } from "@ngrx/store";
import { PeriodeVacances } from "../models/periode-vacances.dto";
import * as PeriodeVacancesAction from "../actions/periode-vacances.actions";

export interface PeriodeVacancesState {
  periodes: PeriodeVacances[];
  periode: PeriodeVacances | undefined;
  loading: boolean;
  loaded: boolean;
  error: any;
  responseOK: boolean | null;
}

export const initialState: PeriodeVacancesState = {
  periodes: [],
  periode: new PeriodeVacances("", new Date(), new Date(), "", 0, ""),
  loading: false,
  loaded: false,
  error: null,
  responseOK: null,
};

const _periodeVacancesReducer = createReducer(
  initialState,
  on(PeriodeVacancesAction.getPeriodesVacances, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(PeriodeVacancesAction.getPeriodeVacancesById, (state, action) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(PeriodeVacancesAction.createPeriodeVacances, (state, action) => ({
    ...state,
    periode: action.periode,
    periodes: [...state.periodes, action.periode],
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(PeriodeVacancesAction.updatePeriodeVacances, (state, action) => ({
    ...state,
    periode: action.periode,
    PeriodesVacances: [
      ...state.periodes.map((periode) => {
        if (periode.id === action.id) {
          return {
            ...periode,
            ...action.periode,
          };
        } else {
          return periode;
        }
      }),
    ],
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(PeriodeVacancesAction.deletePeriodeVacances, (state, action) => ({
    ...state,
    PeriodesVacances: [
      ...state.periodes.filter((periode) => periode.id !== action.id),
    ],
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),
  on(PeriodeVacancesAction.getPeriodesVacancesSuccess, (state, action) => ({
    ...state,
    periodes: action.periodes,
    loading: false,
    loaded: true,
    error: null,
    responseOK: null,
  })),

  on(PeriodeVacancesAction.getPeriodesVacancesError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: null,
  })),

  on(PeriodeVacancesAction.createPeriodeVacancesSuccess, (state, action) => ({
    ...state,
    periode: action.periode,
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),

  on(PeriodeVacancesAction.createPeriodeVacancesError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: false,
  })),

  on(PeriodeVacancesAction.getPeriodeVacancesByIdSuccess, (state, action) => ({
    ...state,
    periode: action.periode,
    loading: false,
    loaded: true,
    error: null,
    responseOK: null,
  })),

  on(PeriodeVacancesAction.getPeriodeVacancesByIdError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: null,
  })),

  on(PeriodeVacancesAction.updatePeriodeVacancesSuccess, (state) => ({
    ...state,
    //periodes: action.periode,
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),

  on(PeriodeVacancesAction.updatePeriodeVacancesError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: false,
  })),

  on(PeriodeVacancesAction.deletePeriodeVacancesSuccess, (state) => ({
    ...state,
    periode: new PeriodeVacances("", new Date(), new Date(), "", 0, ""),
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),
  on(PeriodeVacancesAction.deletePeriodeVacancesError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: false,
  }))
);
export function periodeVacancesReducer(
  state: PeriodeVacancesState | undefined,
  action: Action
): PeriodeVacancesState {
  return _periodeVacancesReducer(state, action);
}
