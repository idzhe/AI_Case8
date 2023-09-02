import { createStore } from 'redux';

// Types
interface AppState {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

type AppAction =
    | { type: 'SET_FIRST_NAME', payload: string }
    | { type: 'SET_LAST_NAME', payload: string }
    | { type: 'SET_EMAIL', payload: string }
    | { type: 'SET_MESSAGE', payload: string };

// Initial State
const initialState: AppState = {
    firstName: "",
    lastName: "",
    email: "",
    message: ""
};

// Reducer
const appReducer = (state: AppState = initialState, action: AppAction): AppState => {
    switch (action.type) {
        case 'SET_FIRST_NAME':
            return { ...state, firstName: action.payload };
        case 'SET_LAST_NAME':
            return { ...state, lastName: action.payload };
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_MESSAGE':
            return { ...state, message: action.payload };
        default:
            return state;
    }
};

// Store
const store = createStore(appReducer);

export default store;
