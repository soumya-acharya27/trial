import {typedAction} from '../action-types';
import { CLUB_CATEOGRY_LOADING, STORE_CLUB_CATEGORIES, TOGGLE_SHOW_BROWSE_MODAL, TOGGLE_SHOW_VERIFY_MODAL, UPDATE_LOCATION } from './clubConstant';
import { clubCategories } from './clubModel';

export function storeClubCategoryLoading(payload: boolean) {
  return typedAction(CLUB_CATEOGRY_LOADING, payload)
}

export function storeClubCategories(payload: clubCategories[]) {
    return typedAction(STORE_CLUB_CATEGORIES, payload);
}

export function toggleShowVerifyModal(payload: boolean) {
  return typedAction(TOGGLE_SHOW_VERIFY_MODAL, payload)
}

export function toggleShowBrowseModal(payload: boolean) {
  return typedAction(TOGGLE_SHOW_BROWSE_MODAL, payload)
}

export function updateLocation(payload: {id: string, name: string}) {
  return typedAction(UPDATE_LOCATION, payload)
}



export type ClubActions = ReturnType<
  | typeof storeClubCategories
  | typeof storeClubCategoryLoading
  | typeof toggleShowBrowseModal
  | typeof toggleShowVerifyModal
  | typeof updateLocation
>;
