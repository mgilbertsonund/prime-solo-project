import axios from 'axios';

// Action Types
export const FETCH_USER_PREFERENCES_REQUEST = 'FETCH_USER_PREFERENCES_REQUEST';
export const FETCH_USER_PREFERENCES_SUCCESS = 'FETCH_USER_PREFERENCES_SUCCESS';
export const FETCH_USER_PREFERENCES_FAILURE = 'FETCH_USER_PREFERENCES_FAILURE';
export const UPDATE_USER_PREFERENCES_REQUEST = 'UPDATE_USER_PREFERENCES_REQUEST';
export const UPDATE_USER_PREFERENCES_SUCCESS = 'UPDATE_USER_PREFERENCES_SUCCESS';
export const UPDATE_USER_PREFERENCES_FAILURE = 'UPDATE_USER_PREFERENCES_FAILURE';

// Action Creators
export const fetchUserPreferencesRequest = () => ({
  type: FETCH_USER_PREFERENCES_REQUEST,
});

export const fetchUserPreferencesSuccess = (preferences) => ({
  type: FETCH_USER_PREFERENCES_SUCCESS,
  payload: preferences,
});

export const fetchUserPreferencesFailure = (error) => ({
  type: FETCH_USER_PREFERENCES_FAILURE,
  payload: error,
});

export const updateUserPreferencesRequest = () => ({
  type: UPDATE_USER_PREFERENCES_REQUEST,
});

export const updateUserPreferencesSuccess = () => ({
  type: UPDATE_USER_PREFERENCES_SUCCESS,
});

export const updateUserPreferencesFailure = (error) => ({
  type: UPDATE_USER_PREFERENCES_FAILURE,
  payload: error,
});

// Thunks
export const fetchUserPreferences = () => {
  return (dispatch) => {
    dispatch(fetchUserPreferencesRequest());
    axios
      .get('/api/user/bookmaker-preferences')
      .then((response) => {
        dispatch(fetchUserPreferencesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchUserPreferencesFailure(error.message));
      });
  };
};

export const updateUserPreferences = (preferences) => {
  return (dispatch, getState) => {
    dispatch(updateUserPreferencesRequest());
    const userId = getState().user.id; // Get user ID from the Redux state
    axios
      .post(`/api/user/bookmaker-preferences`, { preferences })
      .then(() => {
        dispatch(updateUserPreferencesSuccess());
        dispatch(fetchUserPreferences()); // Refresh preferences after update
      })
      .catch((error) => {
        dispatch(updateUserPreferencesFailure(error.message));
      });
  };
};
