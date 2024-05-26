import {
    FETCH_SCHEDULE_REQUEST,
    FETCH_SCHEDULE_SUCCESS,
    FETCH_SCHEDULE_FAILURE,
} from '../actions/schedule.actions';

const initialState = {
    schedule: [],
    loading: false,
    error: null,
}

const scheduleReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SCHEDULE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_SCHEDULE_SUCCESS: 
            return {
                ...state,
                schedule: action.payload,
                loading: false,
                error: null,
            }
        case FETCH_SCHEDULE_FAILURE:
            return {
                ...state,
                laoding: false,
                error: action.payload,
            }
        default:
            return state;
    }
};

export default scheduleReducer;