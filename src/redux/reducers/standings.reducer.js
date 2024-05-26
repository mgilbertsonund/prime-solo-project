import {
    FETCH_STANDINGS_REQUEST,
    FETCH_STANDINGS_SUCCESS,
    FETCH_STANDINGS_FAILURE,
  } from '../actions/standings.actions';
  
  const initialState = {
    alStandings: [],
    nlStandings: [],
    loading: false,
    error: null,
  };
  
  const standingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_STANDINGS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_STANDINGS_SUCCESS:
        return {
          ...state,
          alStandings: action.payload.alStandings,
          nlStandings: action.payload.nlStandings,
          loading: false,
          error: null,
        };
      case FETCH_STANDINGS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default standingsReducer;
  