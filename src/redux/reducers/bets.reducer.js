import {
  FETCH_BETS_REQUEST,
  FETCH_BETS_SUCCESS,
  FETCH_BETS_FAILURE
} from '../actions/getbets.actions';

const initialState = {
  bets: [],
  loading: false,
  error: null
};

const betsReducer = (state = initialState, action) => {
  switch (action.type) {
      case FETCH_BETS_REQUEST:
          return { ...state, loading: true, error: null };
      case FETCH_BETS_SUCCESS:
          return { ...state, loading: false, bets: action.payload };
      case FETCH_BETS_FAILURE:
          return { ...state, loading: false, error: action.payload };
      default:
          return state;
  }
};

export default betsReducer;
