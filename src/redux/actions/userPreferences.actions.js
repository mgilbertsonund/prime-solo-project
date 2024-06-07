import axios from 'axios';

// Action Types
export const FETCH_USER_PREFERENCES_REQUEST = 'FETCH_USER_PREFERENCES_REQUEST';
export const FETCH_USER_PREFERENCES_SUCCESS = 'FETCH_USER_PREFERENCES_SUCCESS';
export const FETCH_USER_PREFERENCES_FAILURE = 'FETCH_USER_PREFERENCES_FAILURE';
export const UPDATE_USER_PREFERENCES_REQUEST = 'UPDATE_USER_PREFERENCES_REQUEST';
export const UPDATE_USER_PREFERENCES_SUCCESS = 'UPDATE_USER_PREFERENCES_SUCCESS';
export const UPDATE_USER_PREFERENCES_FAILURE = 'UPDATE_USER_PREFERENCES_FAILURE';

// Action Creators
export const fetchUserPreferencesRequest = () => ({ type: FETCH_USER_PREFERENCES_REQUEST });
export const fetchUserPreferencesSuccess = (preferences) => ({ type: FETCH_USER_PREFERENCES_SUCCESS, payload: preferences });
export const fetchUserPreferencesFailure = (error) => ({ type: FETCH_USER_PREFERENCES_FAILURE, payload: error });

export const updateUserPreferencesRequest = () => ({ type: UPDATE_USER_PREFERENCES_REQUEST });
export const updateUserPreferencesSuccess = () => ({ type: UPDATE_USER_PREFERENCES_SUCCESS });
export const updateUserPreferencesFailure = (error) => ({ type: UPDATE_USER_PREFERENCES_FAILURE, payload: error });

// Thunks to fetch and update user preferences
export const fetchUserPreferences = (userId) => {
    return dispatch => {
        dispatch(fetchUserPreferencesRequest());
        axios.get(`/api/userPreferences/${userId}`)
            .then(response => {
                dispatch(fetchUserPreferencesSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchUserPreferencesFailure(error.message));
            });
    };
};

export const updateUserPreferences = (userId, preferences) => {
    return dispatch => {
        dispatch(updateUserPreferencesRequest());
        axios.post(`/api/userPreferences/${userId}`, { preferences })
            .then(() => {
                dispatch(updateUserPreferencesSuccess());
                dispatch(fetchUserPreferences(userId)); // Refresh preferences after update
            })
            .catch(error => {
                dispatch(updateUserPreferencesFailure(error.message));
            });
    };
};
