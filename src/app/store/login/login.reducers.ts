import { createReducer, on } from "@ngrx/store";
import { LoginState } from "./LoginState";
import { logIn, loginFail, loginSucccess } from "./login.actions";

const initialState: LoginState = {
    error: null,
    isLoggedIn: false,
    isLoggingIn: false,
    user: {
        username: '',
        id: '',
        subscription: false,
        usertype: ''
    }
}

const reducer = createReducer(initialState,
    on(logIn, currentState => {
        return {
            ...currentState,
            error: null,
            isLoggedIn: false,
            isLoggingIn: true
        }
    }),
    on(loginSucccess, (currentState, action) => {
        return {
            ...currentState,
            user: action.user,
            isLoggedIn: true,
            isLoggingIn: false
        }
    }),
    on(loginFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isLoggedIn: false,
            isLoggingIn: false
        }
    })
)

export function loginReducer(state: LoginState, action: any){
    return reducer(state, action);
}