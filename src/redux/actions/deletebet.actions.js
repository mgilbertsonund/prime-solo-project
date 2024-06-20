// deletebet.actions.js
import axios from 'axios';
import { fetchBets } from './getbets.actions'; 

// Action Types
export const DELETE_BET_REQUEST = 'DELETE_BET_REQUEST';
export const DELETE_BET_SUCCESS = 'DELETE_BET_SUCCESS';
export const DELETE_BET_FAILURE = 'DELETE_BET_FAILURE';

// Action Creators
export const deleteBetRequest = () => ({ type: DELETE_BET_REQUEST });
export const deleteBetSuccess = (betId) => ({ type: DELETE_BET_SUCCESS, payload: betId });
export const deleteBetFailure = (error) => ({ type: DELETE_BET_FAILURE, payload: error });

// Thunk for deleting a bet
export const deleteBet = (betId) => {
    return async (dispatch, getState) => {
        dispatch(deleteBetRequest());
        try {
            await axios.delete(`/api/bets/user/${betId}`);
            dispatch(deleteBetSuccess(betId));
            // Fetch the updated list of bets after deletion
            dispatch(fetchBets()); 
        } catch (error) {
            dispatch(deleteBetFailure(error.message));
        }
    };
};
