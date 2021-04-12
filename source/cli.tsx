#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './ui';

const cli = meow(`
	Usage
	  $ order-calculator

	Options
		--feeRate  	string
		--balance  	string
		--price		string

	Examples
	  $ order-calculator --feeRate=0.0005 --balance=12344 --price=344
	  
		╭─────────────────────────────────────────────────────────────────────────────────╮
		│Balance: 12344                                                                   │
		│Price: 344                                                                       │
		│Fee Rate: 0.0005                                                                 │
		╰─────────────────────────────────────────────────────────────────────────────────╯

		╭─────────────────────────────────────────────────────────────────────────────────╮
		│AMOUNT: 35.86578803                                                              │
		│FEE: 6.17                                                                        │
		│TOTAL: 12344.00                                                                  │
		╰─────────────────────────────────────────────────────────────────────────────────╯

`, {
	flags: {
		feeRate: {
			type: 'string'
		},
		balance: {
			type: 'string'
		},
		price: {
			type: 'string'
		}
	}
});

render(<App feeRate={cli.flags.feeRate} balance={cli.flags.balance} price={cli.flags.price}/>);
