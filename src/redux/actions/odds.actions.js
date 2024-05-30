export const FETCH_ODDS_REQUEST = 'FETCH_ODDS_REQUEST';
export const FETCH_ODDS_SUCCESS = 'FETCH_ODDS_SUCCESS';
export const FETCH_ODDS_FAILURE = 'FETCH_ODDS_FAILURE';
// export const SET_LAST_FETCH_TIME = 'SET_LAST_FETCH_TIME';

export const fetchOddsRequest = () => ({
    type: FETCH_ODDS_REQUEST,
});

export const fetchOddsSuccess = (odds) => ({
    type: FETCH_ODDS_SUCCESS,
    payload: odds
});

export const fetchOddsFailure = (error) => ({
    type: FETCH_ODDS_FAILURE,
    payload: error,
});

// export const setLastFetchTime = (time) => ({
//     type: SET_LAST_FETCH_TIME,
//     payload: time,
// });
