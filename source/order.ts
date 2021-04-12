import { calculateAmount } from './calculator';

const STEP = '0.00000001';
const INITIAL_BALANCE = '15000000';
const TARGET_PRICE = '2802000';
const FEE_RATE = '0.0005';

calculateAmount({
    feeRate: FEE_RATE,
    step: STEP,
    initialBalance: INITIAL_BALANCE,
    targetPrice: TARGET_PRICE,
})