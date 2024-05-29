import {
  FETCH_ODDS_REQUEST,
  FETCH_ODDS_SUCCESS,
  FETCH_ODDS_FAILURE,
  SET_LAST_FETCH_TIME
} from '../actions/odds.actions';

const initialState = {
  odds: [],
  loading: false,
  error: null,
  lastFetchTime: null,
};

const oddsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ODDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ODDS_SUCCESS:
      console.log('Reducer Success:', action.payload);
      return {
        ...state,
        loading: false,
        odds: action.payload,
      };
    case FETCH_ODDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_LAST_FETCH_TIME:
      return {
        ...state,
        lastFetchTime: action.payload,
      };
    default:
      return state;
  }
};

export default oddsReducer;
