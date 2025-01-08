import { Action, createReducer, on } from "@ngrx/store";
import { User } from "../models/user.dto";
import * as UserAction from "../actions/user.actions";
import { Role } from "../models/roles.dto";
export interface UsersState {
  users: User[];
  user: User | undefined;
  loading: boolean;
  loaded: boolean;
  error: any;
  responseOK: boolean | null;
}

export const initialState: UsersState = {
  users: [],
  user: new User("", "", "", "", Role.USER, ""),
  loading: false,
  loaded: false,
  error: null,
  responseOK: null,
};

const _userReducer = createReducer(
  initialState,
  on(UserAction.getUsers, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(UserAction.getUserById, (state, action) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(UserAction.createUser, (state, action) => ({
    ...state,
    user: action.user,
    users: [...state.users, action.user],
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(UserAction.updateUser, (state, action) => ({
    ...state,
    user: action.user,
    users: [
      ...state.users.map((user) => {
        if (user.id === action.id) {
          return {
            ...user,
            ...action.user,
          };
        } else {
          return user;
        }
      }),
    ],
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(UserAction.newPassword, (state, action) => ({
    ...state,
    user: action.user,
    users: [
      ...state.users.map((user) => {
        if (user.id === action.id) {
          return {
            ...user,
            ...action.user,
          };
        } else {
          return user;
        }
      }),
    ],
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(UserAction.updateRol, (state, action) => ({
    ...state,
    users: [
      ...state.users.map((user) => {
        if (user.id === action.id) {
          return {
            ...user,
            ...action.user,
          };
        } else {
          return user;
        }
      }),
    ],
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),

  on(UserAction.deleteUser, (state, action) => ({
    ...state,
    users: [...state.users.filter((user) => user.id !== action.id)],
    loading: true,
    loaded: false,
    error: null,
    responseOK: null,
  })),
  on(UserAction.getUsersSuccess, (state, action) => ({
    ...state,
    users: [...action.users],
    loading: false,
    loaded: true,
    error: null,
    responseOK: null,
  })),

  on(UserAction.getUsersError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: null,
  })),

  on(UserAction.createUserSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),

  on(UserAction.createUserError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: false,
  })),

  on(UserAction.getUserByIdSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
    loaded: true,
    error: null,
    responseOK: null,
  })),

  on(UserAction.getUserByIdError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: null,
  })),

  on(UserAction.updateUserSuccess, (state) => ({
    ...state,
    //user: action.user,
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),

  on(UserAction.updateUserError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: false,
  })),
  on(UserAction.newPasswordSuccess, (state) => ({
    ...state,
    //user: action.user,
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),

  on(UserAction.newPasswordError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: false,
  })),
  on(UserAction.updateRolSuccess, (state) => ({
    ...state,
    //user: action.user,
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),

  on(UserAction.updateRolError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: false,
  })),

  on(UserAction.deleteUserSuccess, (state) => ({
    ...state,
    user: new User("", "", "", "", Role.USER, ""),
    loading: false,
    loaded: true,
    error: null,
    responseOK: true,
  })),
  on(UserAction.deleteUserError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: error,
    responseOK: false,
  }))
);
export function userReducer(
  state: UsersState | undefined,
  action: Action
): UsersState {
  return _userReducer(state, action);
}
