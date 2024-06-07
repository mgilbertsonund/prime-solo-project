import {
    FETCH_BOOKMAKERS_REQUEST,
    FETCH_BOOKMAKERS_SUCCESS,
    FETCH_BOOKMAKERS_FAILURE
} from '../actions/bookmakers.actions';

const initialState = {
    bookmakers: [],
    loading: false,
    error: null
};

const bookmakersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKMAKERS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_BOOKMAKERS_SUCCESS:
            return { ...state, loading: false, bookmakers: action.payload };
        case FETCH_BOOKMAKERS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default bookmakersReducer;
