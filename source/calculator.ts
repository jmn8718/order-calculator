import BigNumber from 'bignumber.js';
import type { BigNumber as BigNumberType } from 'bignumber.js';

const STEP = '0.00000001';

const calculateValues = (currentAmount: BigNumberType, price: string, feeRate: string, step = STEP) => {
    const newAmount = new BigNumber(currentAmount).plus(step);
    const newTotalWithoutFee = newAmount.times(price)
    const newTotal = newTotalWithoutFee.plus(newTotalWithoutFee.times(feeRate));
    return {
        total: newTotal,
        fee: newTotalWithoutFee.times(feeRate),
        amount: newAmount
    }
}

interface IParams {
    feeRate: string;
    initialBalance: string;
    targetPrice: string;
    step?: string;
}

export interface IResult {
    amount: string;
    total: string;
    fee: string;
}

export const calculateAmount = (params: IParams): IResult => {

    const feeToPay = new BigNumber(params.initialBalance).times(params.feeRate);
    const initialAmount = new BigNumber(params.initialBalance).minus(feeToPay).div(params.targetPrice).toFixed(8);

    let it = 0;
    let result = calculateValues(new BigNumber(initialAmount), params.targetPrice, params.feeRate);

    while (result.total.isLessThan(params.initialBalance)) {
        it += 1;
        const iterationValues = calculateValues(result.amount, params.targetPrice, params.feeRate);
        if (iterationValues.total.isLessThan(params.initialBalance)) {
            result = iterationValues;
        } else {
            break;
        }
    }
    console.log({
        iterations: it,
        amount: result.amount.toFixed(8),
        total: result.total.toFixed(2),
        fee: result.fee.toFixed(2)
    });
    return {
        amount: result.amount.toFixed(8),
        total: result.total.toFixed(2),
        fee: result.fee.toFixed(2)
    }
}

