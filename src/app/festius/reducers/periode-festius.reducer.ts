import { Action, createReducer, on } from "@ngrx/store";
import { PeriodeFestius } from "../models/periode-festius.dto";
import * as PeriodeFestiusAction from "../actions/periode-festius.actions";

export interface PeriodeFestiusState {
  periodes: PeriodeFestius[];
  periode: PeriodeFestius | undefined;
  loading: boolean;
  loaded: boolean;
  error: any;
  responseOK: boolean | null;
}

export const initialState: PeriodeFestiusState = {
  periodes: [],
  periode: new PeriodeFestius("", new Date(), "", 0),
  loading: false,
  loaded: false,
  error: null,
  responseOK: null,
};

const _periodeFestiusReducer = createReducer(
  initialState,
  on(PeriodeFestiusAction.getPeriodesFestius, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(PeriodeFestiusAction.getPeriodeFestiusById, (state, action) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(PeriodeFestiusAction.createPeriodeFestius, (state, action) => ({
    ...state,
    periode: action.periode,
    periodes: [...state.periodes, action.periode],
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(PeriodeFestiusAction.updatePeriodeFestius, (state, action) => ({
    ...state,
    periode: action.periode,
    PeriodeFestius: [
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

  on(PeriodeFestiusAction.deletePeriodeFestius, (state, action) => ({
    ...state,
    periodes: [...state.periodes.filter((periode) => periode.id !== action.id)],
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),
  on(PeriodeFestiusAction.getPeriodesFestiusSuccess, (state, action) => ({
    ...state,
    periodes: action.periodes,
    loading: false,
    loaded: true,
    error: null,
    responseOK: null,
  })),

  on(PeriodeFestiusAction.getPeriodesFestiusError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: null,
  })),

  on(PeriodeFestiusAction.createPeriodeFestiusSuccess, (state, action) => ({
    ...state,
    periode: action.periode,
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),

  on(PeriodeFestiusAction.createPeriodeFestiusError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: false,
  })),

  on(PeriodeFestiusAction.getPeriodeFestiusByIdSuccess, (state, action) => ({
    ...state,
    periode: action.periode,
    loading: false,
    loaded: true,
    error: null,
    responseOK: null,
  })),

  on(PeriodeFestiusAction.getPeriodeFestiusByIdError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: null,
  })),

  on(PeriodeFestiusAction.updatePeriodeFestiusSuccess, (state) => ({
    ...state,
    //periodes: action.periode,
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),

  on(PeriodeFestiusAction.updatePeriodeFestiusError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: false,
  })),

  on(PeriodeFestiusAction.deletePeriodeFestiusSuccess, (state) => ({
    ...state,
    periode: new PeriodeFestius("", new Date(), "", 0),
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),
  on(PeriodeFestiusAction.deletePeriodeFestiusError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: false,
  }))
);
export function periodeFestiusReducer(
  state: PeriodeFestiusState | undefined,
  action: Action
): PeriodeFestiusState {
  return _periodeFestiusReducer(state, action);
}
