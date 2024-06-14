// sagas/saveBet.saga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Saga to handle saving the bet
function* saveBetSaga(action) {
    try {
        const betData = action.payload;

        console.log("Sending POST request with data:", betData); 

        const response = yield call(axios.post, '/api/bets', betData);

        console.log("Response from server:", response.data); 

        
        yield put({ type: 'SAVE_BET_SUCCESS', payload: response.data });
    } catch (error) {
        console.error("Error saving bet:", error); 

        
        yield put({ type: 'SAVE_BET_FAILURE', payload: error.message });
    }
}

function* watchSaveBet() {
    yield takeLatest('SAVE_BET', saveBetSaga);
}

export default watchSaveBet;
