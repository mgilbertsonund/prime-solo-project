import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_ODDS_REQUEST,
  fetchOddsSuccess,
  fetchOddsFailure,
  setLastFetchTime,
} from '../actions/odds.actions';

const getLastFetchTime = (state) => state.odds.lastFetchTime;

function* fetchOdds() {
  try {
    const lastFetchTime = yield select(getLastFetchTime);
    const currentTime = new Date().getTime();
    const oneHour = 60 * 60 * 1000;

    if (lastFetchTime && (currentTime - lastFetchTime < oneHour)) {
      return;
    }

    const response = yield call(axios.get, 'https://api.the-odds-api.com/v4/sports/baseball_mlb/odds/', {
      params: {
        apiKey: '4e61482fbe7305751a57fb2f6ba9e613',
        regions: 'us,eu',
        markets: 'h2h',
        oddsFormat: 'american',
      },
    });

    console.log('API Response:', response.data);

    yield put(fetchOddsSuccess(response.data));
    yield put(setLastFetchTime(currentTime));
  } catch (error) {
    console.error('API Error:', error.message);
    yield put(fetchOddsFailure(error.message));
  }
}

function* oddsSaga() {
  yield takeLatest(FETCH_ODDS_REQUEST, fetchOdds);
}

export default oddsSaga;
