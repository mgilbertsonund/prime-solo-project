import {
    FETCH_BOOKMAKERS_REQUEST,
    FETCH_BOOKMAKERS_SUCCESS,
    FETCH_BOOKMAKERS_FAILURE,
} from '../actions/bookmakers.actions';

const initialState = {
    loading: false,
    bookmakers: [],
    error: '',
};

