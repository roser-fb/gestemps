import { ActionReducerMap } from "@ngrx/store";
import * as reducersHeader from "./shared/reducers";
import { AuthEffects } from "./auth/effects/auth.effects";
import * as reducersAuth from "./auth/reducers";
import { UserEffects } from "./user/effects/user.effects";
import * as reducersUser from "./user/reducers";
import { PeriodeDisponibleEffects } from "./disponibilitat/effects/disponibilitat.effects";
import * as reducersPeriodeDisponible from "./disponibilitat/reducers";
import { PeriodeVacancesEffects } from "./vacances/effects/periode-vacances.effects";
import * as reducersPeriodeVacances from "./vacances/reducers";
import { PeriodeFestiusEffects } from "./festius/effects/periode-festius.effects";
import * as reducersPeriodeFestius from "./festius/reducers";
import { GuardiesEffects } from "./guardies/effects/guardies.effects";
import * as reducersGuardies from "./guardies/reducers";

export interface AppState {
  header: reducersHeader.HeaderState;
  auth: reducersAuth.AuthState;
  user: reducersUser.UsersState;
  periodeDisponible: reducersPeriodeDisponible.PeriodesDisponiblesState;
  periodeVacances: reducersPeriodeVacances.PeriodeVacancesState;
  periodeFestius: reducersPeriodeFestius.PeriodeFestiusState;
  guardies: reducersGuardies.GuardiesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  header: reducersHeader.headerReducer,
  auth: reducersAuth.authReducer,
  user: reducersUser.userReducer,
  periodeDisponible: reducersPeriodeDisponible.periodeDisponibleReducer,
  periodeVacances: reducersPeriodeVacances.periodeVacancesReducer,
  periodeFestius: reducersPeriodeFestius.periodeFestiusReducer,
  guardies: reducersGuardies.guardiaReducer,
};

export const EffectsArray: any[] = [
  AuthEffects,
  UserEffects,
  PeriodeDisponibleEffects,
  PeriodeVacancesEffects,
  PeriodeFestiusEffects,
  GuardiesEffects,
];
