import { Action, createReducer, on } from "@ngrx/store";
import { Auth } from "../models/auth.dto";
import * as AuthAction from "../actions";

export interface AuthState {
  credentials: Auth;
  loading: boolean;
  loaded: boolean;
  error: any;
  responseOK: boolean | null;
}

export const initialState: AuthState = {
  credentials: new Auth("", ""),
  loading: false,
  loaded: false,
  error: null,
  responseOK: null,
};

const _authReducer = createReducer(
  initialState,
  on(AuthAction.login, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),
  on(AuthAction.loginSuccess, (state, action) => ({
    ...state,
    credentials: action.credentials,
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),
  on(AuthAction.loginError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: error,
    responseOK: false,
  })),
  on(AuthAction.updateAuth, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(AuthAction.updateAuthSuccess, (state, action) => ({
    ...state,
    credentials: action.credentials,
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),

  on(AuthAction.updateAuthError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: error,
    responseOK: false,
  })),

  on(AuthAction.logout, () => initialState),

  on(AuthAction.resetPassword, (state, action) => ({
    ...state,
    credentials: action.credentials,
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(AuthAction.resetPasswordSuccess, (state, action) => ({
    ...state,
    credentials: action.credentials,
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),

  on(AuthAction.resetPasswordError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: error,
    responseOK: false,
  }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return _authReducer(state, action);
}
