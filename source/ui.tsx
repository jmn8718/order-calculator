import React, { FC, useEffect, useState } from 'react';
import { Text, Box } from 'ink';
import Spinner from 'ink-spinner';
import { calculateAmount, IResult } from './calculator';

const App: FC<{ feeRate?: string, balance?: string, price?: string }> = ({ feeRate = '0.0005', balance = '0', price = '0' }) => {
	const [calculation, setCalculation] = useState<IResult | null>();

	useEffect(() => {
		const result = calculateAmount({
			feeRate,
			initialBalance: balance,
			targetPrice: price
		});
		setCalculation(result);
	}, []);

	return (
		<Box flexDirection="column" margin={2}>
			<Box flexDirection="column" borderStyle="round" borderColor="blue" marginBottom={1}>
				<Text>Balance: <Text>{balance}</Text></Text>
				<Text>Price: <Text>{price}</Text></Text>
				<Text>Fee Rate: <Text>{feeRate}</Text></Text>
			</Box>
			{!calculation ?
				<Text color="green">
					<Spinner type="dots" />
				</Text>
				:
				<Box flexDirection="column" borderStyle="round" borderColor="green" >
					<Text>AMOUNT: <Text>{calculation.amount}</Text></Text>
					<Text>FEE: <Text>{calculation.fee}</Text></Text>
					<Text>TOTAL: <Text>{calculation.total}</Text></Text>
				</Box>
			}
		</Box>
	);
}

module.exports = App;
export default App;
