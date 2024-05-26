// Action types
export const FETCH_STANDINGS_REQUEST = 'FETCH_STANDINGS_REQUEST';
export const FETCH_STANDINGS_SUCCESS = 'FETCH_STANDINGS_SUCCESS';
export const FETCH_STANDINGS_FAILURE = 'FETCH_STANDINGS_FAILURE';

// Action creators
export const fetchStandingsRequest = () => ({
  type: FETCH_STANDINGS_REQUEST,
});

export const fetchStandingsSuccess = (standingsData) => ({
  type: FETCH_STANDINGS_SUCCESS,
  payload: standingsData,
});

export const fetchStandingsFailure = (error) => ({
  type: FETCH_STANDINGS_FAILURE,
  payload: error,
});


// Component Mounting: When the Standings component mounts, the useEffect hook inside it triggers. This hook dispatches the fetchStandingsRequest action.

// Action Dispatch: The fetchStandingsRequest action is dispatched. This action is defined in the standings.actions.js file.

// Saga Listening: In the standings.saga.js file, the standingsSaga function is responsible for listening to actions. It uses takeLatest to watch for FETCH_STANDINGS_REQUEST actions. When this action is dispatched, it calls the fetchAllStandings generator function.

// Data Fetching: Inside the fetchAllStandings generator function, two API calls are made using the call effect from Redux Saga. Each call fetches standings data for a specific league (AL and NL).

// API Call: The fetchStandings function makes an HTTP GET request to the MLB API endpoint for standings data. It waits for the response using axios and returns the data if successful.

// Data Transformation: The fetched data is transformed as needed. In this case, it includes extracting the records property from the API response.

// Action Dispatch (Success): After successful data fetching, the fetchStandingsSuccess action is dispatched with the fetched data as payload.

// Reducer Update: The standingsReducer receives the FETCH_STANDINGS_SUCCESS action and updates the Redux store's alStandings and nlStandings state with the fetched data.

// Component Re-render: Since the Redux store's state has changed, the Standings component re-renders. It reads the updated standings data from the store using the useSelector hook.

// Rendering: The Standings component renders the standings data received from the Redux store. It maps over the standings data to generate the UI, displaying team records, wins, losses, etc., for both the AL and NL leagues.