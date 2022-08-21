import React from 'react';
import {CurrencyExchangeType} from "../../containers/CurrencyExchangeContainer/CurrencyEContainer";
import {CurrencyType} from "../../redux/currencyReducer";

const CurrencyExchange = (props:CurrencyExchangeType) => {
    let state = props.currency

    let currencyRate: number = 0;
    const currenciesName = state.currencies.map((currency: CurrencyType) => {
        if (currency.currencyName === state.currentCurrency) {
            currencyRate = state.isBuying ? currency.buyRate : currency.sellRate;
        }
        return currency.currencyName;
    });

    const changeCurrencyField = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        if (!isFinite(+value)) return;
        if (e.currentTarget.dataset.currency) {
            const trigger: string = e.currentTarget.dataset.currency;
            if (trigger === 'byn') {
                if (value === '') {
                    props.setCurrencyAmount(value, value);
                } else {
                    props.setCurrencyAmount(value, (+Number(value).toFixed(2) / currencyRate).toFixed(2));
                }
            } else {
                if (value === '') {
                    props.setCurrencyAmount(value, value);
                } else {
                    props.setCurrencyAmount((+Number(value).toFixed(2) * currencyRate).toFixed(2), value);
                }
            }
        }
    };
    const changeAction = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.currentTarget.dataset.action === 'buy' ? props.setAction(true) : props.setAction(false);
    };

    const changeCurrentCurrency = (e: React.MouseEvent<HTMLLIElement>) => {
        e.currentTarget.dataset.currency && props.changeCurrency(e.currentTarget.dataset.currency);
    };

    const viewCurrency = state.isBuying ? (
        <React.Fragment>
            <label>
                You give the next amount of BYN:
                <input value={state.amountOfBYN} data-currency="byn" onChange={changeCurrencyField} />
            </label>
            <label>
                You get the next amount of {state.currentCurrency}:
                <input value={state.amountOfCurrency} data-currency="currency" onChange={changeCurrencyField} />
            </label>
        </React.Fragment>
    ) : (
        <React.Fragment>
            <label>
                You give the next amount of {state.currentCurrency}:
                <input value={state.amountOfCurrency} data-currency="currency" onChange={changeCurrencyField} />
            </label>
            <label>
                You get the next amount of BYN:
                <input value={state.amountOfBYN} data-currency="byn" onChange={changeCurrencyField} />
            </label>
        </React.Fragment>
    );

    return (
        <div className="currency">
            <h2>Currency exchange</h2>
            <div className="currency-names">
                <p>Current currency:</p>
                <ul>
                    {currenciesName.map((currency: string, index: number) => {
                        return (
                            <li
                                key={`${index}-${currency}`}
                                className={`currencies ${state.currentCurrency === currency ? 'activeCurrency' : null}`}
                                onClick={changeCurrentCurrency}
                                data-currency={currency}
                            >
                                {currency}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="currency-action">
        <span className={state.isBuying ? 'active' : ''} data-action="buy" onClick={changeAction}>
          Buy
        </span>
                <span className={state.isBuying ? '' : 'active'} data-action="sell" onClick={changeAction}>
          Sell
        </span>
            </div>
            <div className="fields">
                <p>Currency rate: {currencyRate}</p>
                {viewCurrency}
            </div>
        </div>
    );
};

export default CurrencyExchange;
