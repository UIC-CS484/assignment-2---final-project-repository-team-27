import React from 'react';
import './Card.css';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const Card = ({ coins }) => {
    return (
        <div className='card-list'>
            {
                coins.map((coin) => {

                    const sparklineDataPoints = coin.sparkline.map(point => {
                        return Number(point)
                    });

                    return (
                        <div key={coin.rank + 300} className='card'>
                            <img key={coin.rank + 250} alt='crypto icon' src={coin.iconUrl} width="80" height="80" id='crypto-icon-img' />
                            <div key={coin.rank + 350} className='card-text'>
                                <p key={coin.rank}>{`Rank: ${coin.rank}`} </p>
                                <p key={coin.rank + 50}>{`Name: ${coin.name} ${coin.symbol}`} </p>
                                <p key={coin.rank + 100}>{`Price: $ ${Number(coin.price).toFixed(2)}`} </p>
                                <p key={coin.rank + 150}>{`Change: ${coin.change}`} </p>
                                <p key={coin.rank + 200}>{`Market Cap: ${coin.marketCap}`} </p>
                            </div>
                            <Sparklines data={sparklineDataPoints} limit={27} width={70} height={20} margin={3}>
                                <SparklinesLine color="blue" style={{ fill: "none" }} />
                            </Sparklines>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Card;