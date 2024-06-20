// bet.reducer.js

import { UPDATE_BET_SUCCESS, UPDATE_BET_FAILURE } from '../actions/updatebet.actions';

const initialState = {
    bet: null, 
    error: '',
};

const betReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_BET_SUCCESS:
            return {
                ...state,
                bet: action.payload,
                error: '',
            };
        case UPDATE_BET_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default betReducer;
