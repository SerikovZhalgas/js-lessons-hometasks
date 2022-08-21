import React from 'react';
import CurrencyExchange from '../../components/CurrencyExchange/CurrencyExchange';
import {CurrencyState} from '../../redux/currencyReducer';
import {Dispatch} from 'redux';
import {
    ChangeActionAC,
    ChangeCurrencyFieldAC,
    СhangeCurrentCurrencyAC
} from '../../redux/actions';
import {connect} from 'react-redux';
import {IGlobalState} from "../../redux/state";



type MapStatePropsType = {
    currency:CurrencyState
}
type MapDispatchPropsType = {
    setCurrencyAmount: (amountOfBYN: string, amountOfCurrency: string) => void
    setAction: (isBuying: boolean) => void
    changeCurrency: (currency: string) => void
}

export type CurrencyExchangeType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: IGlobalState): MapStatePropsType => {
    return {
        currency: state.currency
    };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        setCurrencyAmount:(amountOfBYN: string, amountOfCurrency: string) => {
            dispatch(ChangeCurrencyFieldAC(amountOfBYN, amountOfCurrency));
        },
        setAction:(isBuying: boolean)=> {
            dispatch(ChangeActionAC(isBuying));
        },
        changeCurrency:(currency: string)=> {
            dispatch(СhangeCurrentCurrencyAC(currency));
        },
    };
};

const CurrencyEContainer = connect(mapStateToProps, mapDispatchToProps)(CurrencyExchange)

export default CurrencyEContainer

