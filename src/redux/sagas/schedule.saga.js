import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_SCHEDULE_REQUEST,
  fetchScheduleSuccess,
  fetchScheduleFailure,
} from '../actions/schedule.actions';

function* scheduleSaga() {
  yield takeLatest(FETCH_SCHEDULE_REQUEST, fetchSchedule);
}

function* fetchSchedule() {
  try {
    const scheduleData = yield call(fetchScheduleData);
    yield put(fetchScheduleSuccess(scheduleData));
  } catch (error) {
    yield put(fetchScheduleFailure(error.message));
  }
}

const fetchScheduleData = async () => {
  try {
    const startDate = getDate();
    const response = await axios.get('https://statsapi.mlb.com/api/v1/schedule', {
      params: {
        sportId: 1,
        startDate: startDate,
        endDate: '2024-09-29'
      }
    });
    return response.data.dates.flatMap(date => date.games);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    throw error;
  }
};

const getDate = () => {
  let today = new Date();
  today.setDate(today.getDate() + 1); // Add one day to the current date
  let yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months are zero-indexed in JavaScript
  let dd = today.getDate();
  let urlDate = '';

  if (mm < 10) {
    mm = `0${mm}`;
  }
  if (dd < 10) {
    dd = `0${dd}`;
  }

  urlDate = `${yyyy}-${mm}-${dd}`;
  return urlDate;
};

export default scheduleSaga;