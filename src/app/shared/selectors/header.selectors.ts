import { createSelector, createFeatureSelector } from "@ngrx/store";
import { HeaderState } from "../reducers";

export const selectHeaderState = createFeatureSelector<HeaderState>("header");

export const selectShowAuthSection = createSelector(
  selectHeaderState,
  (state: HeaderState) => state.showAuthSection
);

export const selectShowNoAuthSection = createSelector(
  selectHeaderState,
  (state: HeaderState) => state.showNoAuthSection
);

export const selectShowGestorSection = createSelector(
  selectHeaderState,
  (state: HeaderState) => state.showGestorSection
);

export const selectShowAdminSection = createSelector(
  selectHeaderState,
  (state: HeaderState) => state.showAdminSection
);
