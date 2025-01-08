import { Action, createReducer, on } from "@ngrx/store";
import { PeriodeDisponible } from "../models/periode-disponible.dto";
import * as PeriodeDisponibleAction from "../actions/disponibilitat.actions";

export interface PeriodesDisponiblesState {
  periodesDisponibles: PeriodeDisponible[];
  periodeDisponible: PeriodeDisponible | undefined;
  loading: boolean;
  loaded: boolean;
  error: any;
  responseOK: boolean | null;
}

export const initialState: PeriodesDisponiblesState = {
  periodesDisponibles: [],
  periodeDisponible: new PeriodeDisponible(
    "",
    new Date(),
    new Date(),
    "",
    0,
    ""
  ),
  loading: false,
  loaded: false,
  error: null,
  responseOK: null,
};

const _periodeDisponibleReducer = createReducer(
  initialState,
  on(PeriodeDisponibleAction.getPeriodeDisponible, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(PeriodeDisponibleAction.getPeriodeDisponibleById, (state, action) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(PeriodeDisponibleAction.createPeriodeDisponible, (state, action) => ({
    ...state,
    periodeDisponible: action.periodeDisponible,
    PeriodesDisponibles: [
      ...state.periodesDisponibles,
      action.periodeDisponible,
    ],
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(PeriodeDisponibleAction.updatePeriodeDisponible, (state, action) => ({
    ...state,
    periodeDisponible: action.periodeDisponible,
    PeriodesDisponibles: [
      ...state.periodesDisponibles.map((periodeDisponible) => {
        if (periodeDisponible.id === action.id) {
          return {
            ...periodeDisponible,
            ...action.periodeDisponible,
          };
        } else {
          return periodeDisponible;
        }
      }),
    ],
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(PeriodeDisponibleAction.newPassword, (state, action) => ({
    ...state,
    periodeDisponible: action.periodeDisponible,
    PeriodesDisponibles: [
      ...state.periodesDisponibles.map((periodeDisponible) => {
        if (periodeDisponible.id === action.id) {
          return {
            ...periodeDisponible,
            ...action.periodeDisponible,
          };
        } else {
          return periodeDisponible;
        }
      }),
    ],
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(PeriodeDisponibleAction.updateRol, (state, action) => ({
    ...state,
    PeriodesDisponibles: [
      ...state.periodesDisponibles.map((periodeDisponible) => {
        if (periodeDisponible.id === action.id) {
          return {
            ...periodeDisponible,
            ...action.periodeDisponible,
          };
        } else {
          return periodeDisponible;
        }
      }),
    ],
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(PeriodeDisponibleAction.deletePeriodeDisponible, (state, action) => ({
    ...state,
    PeriodesDisponibles: [
      ...state.periodesDisponibles.filter(
        (periodeDisponible) => periodeDisponible.id !== action.id
      ),
    ],
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),
  on(PeriodeDisponibleAction.getPeriodeDisponibleSuccess, (state, action) => ({
    ...state,
    periodeDisponibles: [action.periodeDisponible],
    loading: false,
    loaded: true,
    error: null,
    responseOK: null,
  })),

  on(PeriodeDisponibleAction.getPeriodeDisponibleError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: null,
  })),

  on(
    PeriodeDisponibleAction.createPeriodeDisponibleSuccess,
    (state, action) => ({
      ...state,
      periodeDisponible: action.periodeDisponible,
      loading: false,
      loaded: true,
      error: null,
      responseOK: true,
    })
  ),

  on(
    PeriodeDisponibleAction.createPeriodeDisponibleError,
    (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error,
      responseOK: false,
    })
  ),

  on(
    PeriodeDisponibleAction.getPeriodeDisponibleByIdSuccess,
    (state, action) => ({
      ...state,
      periodeDisponible: action.periodeDisponible,
      loading: false,
      loaded: true,
      error: null,
      responseOK: null,
    })
  ),

  on(
    PeriodeDisponibleAction.getPeriodeDisponibleByIdError,
    (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error,
      responseOK: null,
    })
  ),

  on(PeriodeDisponibleAction.updatePeriodesDisponiblesuccess, (state) => ({
    ...state,
    //periodeDisponible: action.periodeDisponible,
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),

  on(
    PeriodeDisponibleAction.updatePeriodeDisponibleError,
    (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error,
      responseOK: false,
    })
  ),
  on(PeriodeDisponibleAction.newPasswordSuccess, (state) => ({
    ...state,
    //periodeDisponible: action.periodeDisponible,
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),

  on(PeriodeDisponibleAction.newPasswordError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: false,
  })),
  on(PeriodeDisponibleAction.updateRolSuccess, (state) => ({
    ...state,
    //periodeDisponible: action.periodeDisponible,
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),

  on(PeriodeDisponibleAction.updateRolError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: false,
  })),

  on(PeriodeDisponibleAction.deletePeriodesDisponiblesuccess, (state) => ({
    ...state,
    periodeDisponible: new PeriodeDisponible(
      "",
      new Date(),
      new Date(),
      "",
      0,
      ""
    ),
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),
  on(
    PeriodeDisponibleAction.deletePeriodeDisponibleError,
    (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error,
      responseOK: false,
    })
  )
);
export function periodeDisponibleReducer(
  state: PeriodesDisponiblesState | undefined,
  action: Action
): PeriodesDisponiblesState {
  return _periodeDisponibleReducer(state, action);
}
