// Action types
export const FETCH_STANDINGS_REQUEST = 'FETCH_STANDINGS_REQUEST';
export const FETCH_STANDINGS_SUCCESS = 'FETCH_STANDINGS_SUCCESS';
export const FETCH_STANDINGS_FAILURE = 'FETCH_STANDINGS_FAILURE';

// Action creators
export const fetchStandingsRequest = () => ({
  type: FETCH_STANDINGS_REQUEST,
});

export const fetchStandingsSuccess = (standingsData) => ({
  type: FETCH_STANDINGS_SUCCESS,
  payload: standingsData,
});

export const fetchStandingsFailure = (error) => ({
  type: FETCH_STANDINGS_FAILURE,
  payload: error,
});

