import { ActionReducerMap } from "@ngrx/store";
import * as reducersHeader from "./shared/reducers";
import { AuthEffects } from "./auth/effects/auth.effects";
import * as reducersAuth from "./auth/reducers";
import { UserEffects } from "./user/effects/user.effects";
import * as reducersUser from "./user/reducers";

export interface AppState {
  header: reducersHeader.HeaderState;
  auth: reducersAuth.AuthState;
  user: reducersUser.UsersState;
}

export const appReducers: ActionReducerMap<AppState> = {
  header: reducersHeader.headerReducer,
  auth: reducersAuth.authReducer,
  user: reducersUser.userReducer,
};

export const EffectsArray: any[] = [AuthEffects, UserEffects];
