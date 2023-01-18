import { LoadingState } from "./loading/LoadingState";
import { LoginState } from "./login/LoginState";
import { UserState } from "./user/UserState";

export interface AppState {
    loading: LoadingState;
    login: LoginState;
    user: UserState;
}