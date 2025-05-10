import { authState } from './authModel';
import { AuthActions } from './authAction';
import { STORE_CREDENTIALS, STORE_USERINFO } from './authConstants';
import { act } from 'react';
import { User } from '../../interface/signUpInterface';

const initialAuthState: authState = {
    accessToken: "",
    expiresIn: 0,
    id: "",
    refreshToken: "",
    tokenType: "",
    onBoardingCompleted: false,
    userInfo: {} as User
};

export default function demoReducer(
  state: authState = initialAuthState,
  action: AuthActions,
) {
  switch (action.type) {
    case STORE_CREDENTIALS:
        return {
            ...state,
            accessToken: action?.payload?.accessToken,
            expiresIn: action?.payload?.expiresIn,
            id:  action?.payload?.id,
            refreshToken:  action?.payload?.refreshToken,
            tokenType:  action?.payload?.tokenType,
            onBoardingCompleted: action?.payload?.onboarding?.isCompleted
        }

    case STORE_USERINFO:
      return {
        ...state,
        userInfo: action?.payload
      }

    default:
      return state; 
  }
}
