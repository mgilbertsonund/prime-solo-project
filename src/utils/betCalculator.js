// utils.js

/**
 * Calculate the profit or loss for a bet.
 * @param {number} stake - The amount of money placed on the bet.
 * @param {number} odds - The decimal odds of the bet.
 * @param {boolean} successful - Whether the bet was successful or not.
 * @returns {number} The profit (positive) or loss (negative) amount.
 */
export const calculateProfitOrLoss = (stake, odds, successful) => {
    if (successful === true) {
        if (odds > 0) {
            return (odds / 100) * stake;
        } else {
            return (stake / (-1 * odds / 100));
        }
    } else if (successful === false) {
        // Loss is the stake amount
        return -stake;
    } else {
        // Handle null or undefined case
        return 0;
    }
};
