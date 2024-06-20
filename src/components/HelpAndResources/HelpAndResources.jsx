import React from 'react';
import './HelpAndResources.css';
import arbitrageExample from '../../assets/arbitrageExample.png';

const HelpAndResources = () => {
    return (
        <div className="help-container">
            <h1>Help & Resources</h1>

            <section className="introduction">
                <p>Welcome to our arbitrage betting website! Here, you'll find definitions of common betting terms and an explanation of the purpose and benefits of our platform.</p>
            </section>

            <section className="betting-definitions">
                <h2>Betting Definitions</h2>
                <dl>
                    <dt>Arbitrage Betting</dt>
                    <dd>A betting strategy that involves placing bets on all possible outcomes of an event to ensure a profit regardless of the outcome.</dd>
                    
                    <dt>Stake</dt>
                    <dd>The amount of money placed on a bet.</dd>
                    
                    <dt>Odds</dt>
                    <dd>A numerical expression representing the likelihood of a particular outcome occurring.</dd>
                    
                    <dt>Bookmaker</dt>
                    <dd>An organization or person that accepts and pays off bets on sporting and other events.</dd>
                    
                    <dt>Profit/Loss</dt>
                    <dd>The amount of money gained or lost from a bet.</dd>
                    
                    <dt>Moneyline</dt>
                    <dd>A bet on which team or player will win a game or contest.</dd>
                </dl>
            </section>

            <section className="website-purpose">
                <h2>Purpose of Our Website</h2>
                <p>
                    Our arbitrage betting website is designed to help you find and capitalize on arbitrage opportunities across different bookmakers. By comparing odds and calculating potential profits, we enable you to place bets in a way that guarantees returns, regardless of the outcome. Our tools and resources are aimed at providing you with the knowledge and insights needed to engage in this profitable betting strategy safely and effectively.
                </p>
            </section>

            <section className="arbitrage-card-explanation">
                <h2>Understanding the Match Page</h2>
                <p>
                    On the match page, you will see a table displaying the odds offered by various bookmakers for each team. If a cell is highlighted in green, it means that the price is better than Pinnacle's price. These highlighted cells represent bets that should be considered due to their favorable odds, although they may not always indicate an arbitrage opportunity.
                </p>
                <p>
                    Below this table, the "Suggested Arbitrage Bets" card identifies specific arbitrage opportunities. When this card is outlined in green, it signals a profitable arbitrage bet where you can place bets on all possible outcomes and ensure a profit regardless of the event's result.
                </p>
                <img src={arbitrageExample} alt="Arbitrage Betting Process" className="purpose-image"/>
                <p>
                    In the example above, to secure a profit, a bettor should wager 
                    <span className="highlight-amount"> $60.88</span> at SuperBook on the Houston Astros Moneyline, and 
                    <span className="highlight-amount"> $39.19</span> at WynnBET on the Chicago White Sox Moneyline.
                </p>
            </section>
        </div>
    );
};

export default HelpAndResources;
