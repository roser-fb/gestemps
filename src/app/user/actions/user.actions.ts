import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.dto";

export const getUsers = createAction("[USUARI] Get users");
export const getUserById = createAction(
  "[USUARI] Get user by id",
  props<{ id: string }>()
);
export const createUser = createAction(
  "[USUARI] crea user",
  props<{ user: User }>()
);
export const updateUser = createAction(
  "[USUARI] Update user",
  props<{ id: string; user: User }>()
);
export const newPassword = createAction(
  "[USUARI] Update contrasenya",
  props<{ id: string; user: User }>()
);
export const updateRol = createAction(
  "[USUARI] Update rol",
  props<{ id: string; user: User }>()
);
export const deleteUser = createAction(
  "[USUARI] Delete user",
  props<{ id: string }>()
);

export const getUsersSuccess = createAction(
  "[USUARI] Get users Success",
  props<{ users: User[] }>()
);

export const getUsersError = createAction(
  "[USUARI] Get users Error",
  props<{ error: any }>()
);

export const getUserByIdSuccess = createAction(
  "[USUARI] Get users by id Success",
  props<{ user: User | undefined }>()
);

export const getUserByIdError = createAction(
  "[USUARI] Get users by id Error",
  props<{ error: any }>()
);

export const createUserSuccess = createAction(
  "[USUARI] Create user Success",
  props<{ user: User }>()
);

export const createUserError = createAction(
  "[USUARI] Create user Error",
  props<{ error: any }>()
);

export const newPasswordSuccess = createAction(
  "[USUARI] Update contrasenya Success",
  props<{ user: User }>()
);

export const newPasswordError = createAction(
  "[USUARI] Update contrasenya Error",
  props<{ error: any }>()
);
export const updateRolSuccess = createAction(
  "[USUARI] Update rol Success",
  props<{ user: User }>()
);

export const updateRolError = createAction(
  "[USUARI] Update rol Error",
  props<{ error: any }>()
);
export const updateUserSuccess = createAction(
  "[USUARI] Update user Success",
  props<{ user: User }>()
);

export const updateUserError = createAction(
  "[USUARI] Update user Error",
  props<{ error: any }>()
);

export const deleteUserSuccess = createAction("[USUARI] Delete user Success");

export const deleteUserError = createAction(
  "[USUARI] Delete user Error",
  props<{ error: any }>()
);
