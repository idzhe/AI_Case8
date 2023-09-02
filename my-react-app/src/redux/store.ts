import { createStore } from 'redux';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

const initialState: User = {
    firstName: '',
    lastName: '',
    email: '',
    message: ''
}

const userReducer = (state = initialState, action: any) => {
    if (action.type === 'SUBMIT_USER') {
        return {
            ...state,
            ...action.payload
        };
    } else {
        return state;
    }
}

export const store = createStore(userReducer);
