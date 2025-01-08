import { createAction, props } from "@ngrx/store";
import { Auth } from "../models/auth.dto";

export const login = createAction(
  "[AUTH] LogIn",
  props<{ credentials: Auth }>()
);

export const loginSuccess = createAction(
  "[Auth] LogIn Success",
  props<{ credentials: Auth }>()
);

export const loginError = createAction(
  "[Auth] LogIn Error",
  props<{ error: any }>()
);

export const updateAuth = createAction(
  "[AUTH] Actualitza Credencials",
  props<{ credentials: Auth }>()
);

export const updateAuthSuccess = createAction(
  "[Auth] Actualitza Credencial Success",
  props<{ credentials: Auth }>()
);

export const updateAuthError = createAction(
  "[Auth] Actualitza Credencial Error",
  props<{ error: any }>()
);

export const logout = createAction("[AUTH] LogOut");

export const resetPassword = createAction(
  "[AUTH] ResetPasword",
  props<{ credentials: Auth }>()
);

export const resetPasswordSuccess = createAction(
  "[Auth] ResetPasword Success",
  props<{ credentials: Auth }>()
);

export const resetPasswordError = createAction(
  "[Auth] ResetPasword Error",
  props<{ error: any }>()
);
