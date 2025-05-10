import {typedAction} from '../action-types';
import { Credential } from './authModel';
import { STORE_CREDENTIALS, STORE_USERINFO } from './authConstants';
import { User } from '../../interface/signUpInterface';


export function storeCredentials(payload: Credential) {
    return typedAction(STORE_CREDENTIALS, payload);
}

export function storeUserInfo(userInfo: User) {
  return typedAction(STORE_USERINFO, userInfo)
}


export type AuthActions = ReturnType<
  | typeof storeCredentials
  | typeof storeUserInfo
>;
