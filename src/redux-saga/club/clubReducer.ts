
import { act } from 'react';
import { clubState } from './clubModel';
import { ClubActions } from './clubAction';
import { CLUB_CATEOGRY_LOADING, STORE_CLUB_CATEGORIES, TOGGLE_SHOW_BROWSE_MODAL, TOGGLE_SHOW_VERIFY_MODAL, UPDATE_LOCATION } from './clubConstant';

const initialAuthState: clubState = {
  clubCategories: [],
  clubCategoryLoading: false,

  showVerifyModal: false,
  showBrowseModal: false,

  location: {
    id: '',
    name: ''
  }
  
};

export default function clubReducer(
  state: clubState = initialAuthState,
  action: ClubActions,
) {
  switch (action.type) {
    case STORE_CLUB_CATEGORIES:
        return {
            ...state,
            clubCategories: action?.payload
        }
        break;
    case CLUB_CATEOGRY_LOADING: 
        return {
          ...state,
          clubCategoryLoading: action?.payload
        }
        break;
    case TOGGLE_SHOW_VERIFY_MODAL:
        return {
          ...state,
          showVerifyModal: action?.payload
        }
        break;
    case TOGGLE_SHOW_BROWSE_MODAL:
        return {
          ...state,
          showBrowseModal: action?.payload
        }
        break;
    case UPDATE_LOCATION:
      return {
        ...state,
        location: action?.payload
      }
      break;

    default:
      return state; 
  }
}
