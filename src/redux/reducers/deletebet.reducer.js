import {
    DELETE_BET_REQUEST,
    DELETE_BET_SUCCESS,
    DELETE_BET_FAILURE,
} from '../actions/deletebet.actions';

const initialState = {
    bets: [],
    loading: false,
    error: null
};

const betReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_BET_REQUEST:
            return {
                ...state,
                loading: true
            };
        case DELETE_BET_SUCCESS:
            return {
                ...state,
                loading: false,
                bets: state.bets.filter(bet => bet.id !== action.payload)
            };
        case DELETE_BET_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default betReducer;
