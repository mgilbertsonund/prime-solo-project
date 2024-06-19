import {
  FETCH_USER_PREFERENCES_REQUEST,
  FETCH_USER_PREFERENCES_SUCCESS,
  FETCH_USER_PREFERENCES_FAILURE,
  UPDATE_USER_PREFERENCES_REQUEST,
  UPDATE_USER_PREFERENCES_SUCCESS,
  UPDATE_USER_PREFERENCES_FAILURE,
} from '../actions/userPreferences.actions';

const initialState = {
  preferences: [],
  loading: false,
  error: null,
};

const userPreferencesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PREFERENCES_REQUEST:
    case UPDATE_USER_PREFERENCES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USER_PREFERENCES_SUCCESS:
      return {
        ...state,
        loading: false,
        preferences: action.payload,
      };
    case FETCH_USER_PREFERENCES_FAILURE:
    case UPDATE_USER_PREFERENCES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_USER_PREFERENCES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default userPreferencesReducer;
