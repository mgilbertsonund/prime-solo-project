// utils.js

/**
 * Calculate the profit or loss for a bet.
 * @param {number} stake - The amount of money placed on the bet.
 * @param {number} odds - The decimal odds of the bet.
 * @param {boolean} successful - Whether the bet was successful or not.
 * @returns {number} The profit (positive) or loss (negative) amount.
 */
export const calculateProfitOrLoss = (stake, odds, successful) => {
    console.log('figs', stake, odds, successful)
    if (successful) {
        if (odds > 0) {
            return (odds / 100) * stake;
        } else {
            return (stake / (-1 * odds / 100))
        }
        // Profit = (odds - 1) * stake
    } else {
        // Loss is the stake amount
        return -stake;
    }
};
