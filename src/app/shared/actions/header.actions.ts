import { createAction, props } from "@ngrx/store";

export const toggleAuthSection = createAction(
  "[HEADER] Toggle Auth Section",
  props<{ show: boolean }>()
);

export const toggleNoAuthSection = createAction(
  "[HEADER] Toggle No Auth Section",
  props<{ show: boolean }>()
);

export const toggleGestorSection = createAction(
  "[HEADER] Toggle Gestor Section",
  props<{ show: boolean }>()
);

export const toggleAdminSection = createAction(
  "[HEADER] Toggle Admin Section",
  props<{ show: boolean }>()
);
