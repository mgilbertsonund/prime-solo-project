// Action types
export const FETCH_SCHEDULE_REQUEST = 'FETCH_SCHEDULE_REQUEST';
export const FETCH_SCHEDULE_SUCCESS = 'FETCH_SCHEDULE_SUCCESS';
export const FETCH_SCHEDULE_FAILURE = 'FETCH_SCHEDULE_FAILURE';

// Action creators
export const fetchScheduleRequest = () => ({
  type: FETCH_SCHEDULE_REQUEST,
});

export const fetchScheduleSuccess = (scheduleData) => ({
  type: FETCH_SCHEDULE_SUCCESS,
  payload: scheduleData,
});

export const fetchScheduleFailure = (error) => ({
  type: FETCH_SCHEDULE_FAILURE,
  payload: error,
});