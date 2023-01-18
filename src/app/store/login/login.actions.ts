import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user/User";

export const logIn = createAction("[login]");
export const loginSucccess = createAction("[login] success", props<{user: User}>());
export const loginFail = createAction("[login] fail", props<{error: any}>())