import { Action, createReducer, on } from "@ngrx/store";
import { Guardia } from "../models/guardies.dto";
import * as GuardiesAction from "../actions/guardies.actions";

export interface GuardiesState {
  guardies: Guardia[];
  guardia: Guardia | undefined;
  loading: boolean;
  loaded: boolean;
  error: any;
  responseOK: boolean | null;
}

export const initialState: GuardiesState = {
  guardies: [],
  guardia: new Guardia("", new Date(), 0, 0, 0, ""),
  loading: false,
  loaded: false,
  error: null,
  responseOK: null,
};

const _guardiesReducer = createReducer(
  initialState,
  on(GuardiesAction.getGuardies, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(GuardiesAction.getGuardiaById, (state, action) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(GuardiesAction.createGuardia, (state, action) => ({
    ...state,
    guardia: action.guardia,
    guardies: [...state.guardies, action.guardia],
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(GuardiesAction.updateGuardia, (state, action) => ({
    ...state,
    guardia: action.guardia,
    Guardies: [
      ...state.guardies.map((guardia) => {
        if (guardia.id === action.id) {
          return {
            ...guardia,
            ...action.guardia,
          };
        } else {
          return guardia;
        }
      }),
    ],
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(GuardiesAction.deleteGuardia, (state, action) => ({
    ...state,
    guardies: [...state.guardies.filter((guardia) => guardia.id !== action.id)],
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),
  on(GuardiesAction.getGuardiesSuccess, (state, action) => ({
    ...state,
    guardies: action.guardies,
    loading: false,
    loaded: true,
    error: null,
    responseOK: null,
  })),

  on(GuardiesAction.getGuardiesError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: null,
  })),

  on(GuardiesAction.createGuardiaSuccess, (state, action) => ({
    ...state,
    guardia: action.guardia,
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),

  on(GuardiesAction.createGuardiaError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: false,
  })),

  on(GuardiesAction.getGuardiaByIdSuccess, (state, action) => ({
    ...state,
    guardia: action.guardia,
    loading: false,
    loaded: true,
    error: null,
    responseOK: null,
  })),

  on(GuardiesAction.getGuardiaByIdError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: null,
  })),

  on(GuardiesAction.updateGuardiaSuccess, (state) => ({
    ...state,
    //guardies: action.guardia,
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),

  on(GuardiesAction.updateGuardiaError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: false,
  })),

  on(GuardiesAction.deleteGuardiaSuccess, (state) => ({
    ...state,
    guardia: new Guardia("", new Date(), 0, 0, 0, ""),
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),
  on(GuardiesAction.deleteGuardiaError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: false,
  }))
);
export function guardiaReducer(
  state: GuardiesState | undefined,
  action: Action
): GuardiesState {
  return _guardiesReducer(state, action);
}
