import { UserState } from "../user/UserState";

export interface LoginState {
    error: any;
    isLoggedIn: boolean;
    isLoggingIn: boolean;
    user: UserState;
}