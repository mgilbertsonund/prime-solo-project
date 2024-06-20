// updatebet.actions.js

import axios from 'axios';
import { fetchBets } from './getbets.actions'; // Assuming this action fetches all bets after update

// Action Types
export const UPDATE_BET_REQUEST = 'UPDATE_BET_REQUEST';
export const UPDATE_BET_SUCCESS = 'UPDATE_BET_SUCCESS';
export const UPDATE_BET_FAILURE = 'UPDATE_BET_FAILURE';

// Action Creators
export const updateBetRequest = () => ({ type: UPDATE_BET_REQUEST });
export const updateBetSuccess = (updatedBet) => ({ type: UPDATE_BET_SUCCESS, payload: updatedBet });
export const updateBetFailure = (error) => ({ type: UPDATE_BET_FAILURE, payload: error });

// Thunk action to update a bet
export const updateBet = (betId, successful) => async (dispatch) => {
    dispatch(updateBetRequest());
    try {
        const response = await axios.put(`/api/bets/user/${betId}`, { successful_bet: successful });
        dispatch(updateBetSuccess(response.data)); 
        dispatch(fetchBets()); 
    } catch (error) {
        dispatch(updateBetFailure(error.message));
    }
};
