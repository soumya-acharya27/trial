import {combineReducers} from 'redux';
import authReducer from './auth/authReducer';
import clubReducer from './club/clubReducer';

const reducers = {
    authReducer: authReducer,
    clubReducer: clubReducer
}

export const rootReducer = combineReducers(reducers);
export type RootState = ReturnType<typeof rootReducer>;