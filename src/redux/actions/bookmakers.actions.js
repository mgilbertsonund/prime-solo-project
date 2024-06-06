import axios from 'axios';

export const FETCH_BOOKMAKERS_REQUEST = 'FETCH_BOOKMAKERS_REQUEST';
export const FETCH_BOOKMAKERS_SUCCESS = 'FETCH_BOOKMAKERS_SUCCESS';
export const FETCH_BOOKMAKERS_FAILURE = 'FETCH_BOOKMAKERS_FAILURE';

export const fetchBookmakersRequest = () => ({
    type: FETCH_BOOKMAKERS_REQUEST,
});

export const fetchBookmakersSuccess = (bookmakers) => ({
    type: FETCH_BOOKMAKERS_SUCCESS,
    payload: bookmakers,
});

export const fetchBookmakersFailure = () => ({
    type: FETCH_BOOKMAKERS_FAILURE,
    payload: error,
})

export const fetchBookmakers = () => {
    return (dispatch) => {
        dispatch(fetchBookmakersRequest());
        axios.get('/api/bookmakers')
            .then(response => {
                dispatch(fetchBookmakersSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchBookmakersFailure(error.message));
            });
    };
};