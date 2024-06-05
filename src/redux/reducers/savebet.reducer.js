const saveBetReducer = (state = [], action) => {
    switch (action.type) {
        case 'SAVE_BET':
            return [...state, action.payload];
        default:
            return state;
    }
};

export default saveBetReducer;