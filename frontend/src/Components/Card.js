import React from 'react';
import './Card.css';

const Card = ({ coins }) => {
    return (
        <div className='card-list'>
            {
                coins.map((coin) => {
                    return (
                        <div className='card'>
                            <img alt='crypto icon' src={coin.iconUrl} width="80" height="80" id='crypto-icon-img' />
                            <div classname='card-text'>
                                <p key={coin.rank}>{`Rank: ${coin.rank}`} </p>
                                <p>{`Name: ${coin.name} ${coin.symbol}`} </p>
                                <p>{`Price: $ ${Number(coin.price).toFixed(2)}`} </p>
                                <p>{`Change: ${coin.change}`} </p>
                                <p>{`Market Cap: ${coin.marketCap}`} </p>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Card;