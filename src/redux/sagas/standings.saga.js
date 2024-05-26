import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_STANDINGS_REQUEST,
  fetchStandingsSuccess,
  fetchStandingsFailure,
} from '../actions/standings.actions';

function* standingsSaga() {
  yield takeLatest(FETCH_STANDINGS_REQUEST, fetchAllStandings);
}

function* fetchAllStandings() {
  try {
    const alData = yield call(fetchStandings, 103);
    const nlData = yield call(fetchStandings, 104);
    yield put(fetchStandingsSuccess({ alStandings: alData, nlStandings: nlData }));
  } catch (error) {
    yield put(fetchStandingsFailure(error.message));
  }
}
  
const fetchStandings = async (leagueId) => {
    try {
      const response = await axios.get(`https://statsapi.mlb.com/api/v1/standings?leagueId=${leagueId}`);
      return response.data.records;
    } catch (error) {
      console.error('Error fetching standings:', error);
      throw error;
    }
};

export default standingsSaga;
