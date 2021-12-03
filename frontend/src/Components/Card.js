import React from 'react';
import './Card.css';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const numFormatter = num => {
    if (num >= 1000 && num < 1000000) {
        return (num / 1000).toFixed(1) + ' K'; // convert to K for number from > 1000 < 1 million 
    }
    else if (num >= 1000000 && num < 1000000000) {
        return (num / 1000000).toFixed(1) + ' M'; // convert to M for number from > 1 million 
    }
    else if (num >= 1000000000 && num < 1000000000000) {
        return (num / 1000000000).toFixed(1) + ' B'; // convert to M for number from > 1 billion 
    }
    else if (num >= 1000000000000) {
        return (num / 1000000000000).toFixed(1) + ' T'; // convert to T for number from > 1 trillion 
    }
    else if (num < 1000) {
        return num;       // if value < 1000, nothing to do
    }
}

const Card = ({ coins }) => {
    let textcol = '';
    return (
        <div className='card-list'>
            {
                coins.map((coin) => {

                    Number(coin.change) >= 0 ? textcol = 'green' : textcol = 'red';
                    const sparklineDataPoints = coin.sparkline.map(point => {
                        return Number(point)
                    });

                    return (
                            <div key={coin.rank + 300} className='card'>
                                <img key={coin.rank + 250} alt='crypto icon' src={coin.iconUrl} width="80" height="80" id='crypto-icon-img' />
                                <div key={coin.rank + 350} className='card-text'>
                                    <p className='p-card-text' key={coin.rank}>
                                        {`Rank: ${coin.rank}`}
                                    </p>
                                    <p className='p-card-text' key={coin.rank + 50}>
                                        {`Name: ${coin.name}`}
                                    </p>
                                    <p className='p-card-text' key={coin.rank + 450}>
                                        {`Code: ${coin.symbol}`}
                                    </p>
                                    <p className='p-card-text' key={coin.rank + 100}>
                                        {`Price: $ ${Number(coin.price).toFixed(2)}`}
                                    </p>
                                    <p className='p-card-text' key={coin.rank + 150} id={textcol}>
                                        {`Change: ${Number(coin.change)}`}
                                    </p>
                                    <p className='p-card-text' key={coin.rank + 200}>
                                        {`Market Cap: ${numFormatter(Number(coin.marketCap))}`}
                                    </p>
                                    <p className='p-card-text' key={coin.rank + 400}>
                                        {`24h Volume: ${numFormatter(Number(coin['24hVolume']))}`}
                                    </p>
                                </div>
                                <Sparklines data={sparklineDataPoints} limit={27} width={70} height={20} margin={3}>
                                    <SparklinesLine color={textcol} style={{ fill: "none" }} />
                                </Sparklines>
                            </div>
                    );
                })
            }
        </div>
    );
}

export default Card;