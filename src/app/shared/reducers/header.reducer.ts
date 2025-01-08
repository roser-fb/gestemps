import { createReducer, on } from "@ngrx/store";
import * as HeaderAction from "../actions/header.actions";

export interface HeaderState {
  showSecondaryMenu: boolean;
  showAuthSection: boolean;
  showNoAuthSection: boolean;
  showGestorSection: boolean;
  showAdminSection: boolean;
  showAlertaCistella: boolean;
}

export const initialState: HeaderState = {
  showSecondaryMenu: false,
  showAuthSection: false,
  showNoAuthSection: true,
  showGestorSection: false,
  showAdminSection: false,
  showAlertaCistella: false,
};

export const _headerReducer = createReducer(
  initialState,

  on(HeaderAction.toggleAuthSection, (state, action) => ({
    ...state,
    showAuthSection: action.show,
  })),

  on(HeaderAction.toggleNoAuthSection, (state, action) => ({
    ...state,
    showNoAuthSection: action.show,
  })),

  on(HeaderAction.toggleGestorSection, (state, action) => ({
    ...state,
    showGestorSection: action.show,
  })),

  on(HeaderAction.toggleAdminSection, (state, action) => ({
    ...state,
    showAdminSection: action.show,
  }))
);
export function headerReducer(state: any, action: any) {
  return _headerReducer(state, action);
}
