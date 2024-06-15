import { FETCH_BETS_SUCCESS, FETCH_BETS_FAILURE } from './actionTypes';

// Action to fetch bets data
export const fetchBets = (userId) => async dispatch => {
    try {
        const response = await fetch(`/api/bets/user/${userId}`);
        const data = await response.json();
        dispatch({ type: FETCH_BETS_SUCCESS, payload: data });
    } catch (error) {
        console.error('Error fetching bets:', error);
        dispatch({ type: FETCH_BETS_FAILURE, error });
    }
};
