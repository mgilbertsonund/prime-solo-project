import axios from 'axios';

// Action Types
export const FETCH_BETS_REQUEST = 'FETCH_BETS_REQUEST';
export const FETCH_BETS_SUCCESS = 'FETCH_BETS_SUCCESS';
export const FETCH_BETS_FAILURE = 'FETCH_BETS_FAILURE';

// Action Creators
export const fetchBetsRequest = () => ({
    type: FETCH_BETS_REQUEST
});

export const fetchBetsSuccess = (bets) => ({
    type: FETCH_BETS_SUCCESS,
    payload: bets
});

export const fetchBetsFailure = (error) => ({
    type: FETCH_BETS_FAILURE,
    payload: error
});

// Thunk to fetch bets for the authenticated user
export const fetchBets = () => {
    return async (dispatch) => {
        dispatch(fetchBetsRequest());
        try {
            const response = await axios.get('/api/bets/user');
            dispatch(fetchBetsSuccess(response.data));
        } catch (error) {
            dispatch(fetchBetsFailure(error.message));
        }
    };
};
