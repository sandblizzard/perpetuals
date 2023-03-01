import { writable } from 'svelte/store';
import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
import {
	fetchCoingeckoPriceFromId,
	getWalletBalances,
	type HeliusGetWalletBalanceResponse
} from '.';
import BigNumber from 'bignumber.js';

export type Token = {
	address: string;
	chainId: number;
	decimals: number;
	logoURI: string;
	name: string;
	symbol: string;
	extensions: {
		coingeckoId: string;
	};
	priceUSD?: number;
	amount?: number; // amount of tokens held by the wallet
	amountUSD?: number;
};

export type Tokens = Token[];

export type TokenMap = Record<string, Token>;

export const tokensStore = writable<Tokens>([]);

export const hydrateTokensStore = async (
	tokens: Tokens,
	walletBalances: HeliusGetWalletBalanceResponse
): Promise<Tokens> => {
	return (
		await Promise.all(
			tokens.map(async (token) => {
				const walletToken = walletBalances.tokens.find((t) => t.mint === token.address);
				if (walletToken) {
					// fetch prices
					const price = await fetchCoingeckoPriceFromId(token.extensions.coingeckoId, 'usd');
					const priceUsd = price[token.extensions.coingeckoId].usd;

					token.priceUSD = priceUsd;
					token.amount = new BigNumber(walletToken.amount).shiftedBy(-token.decimals).toNumber();
					token.amountUSD = new BigNumber(token.amount)
						.div(priceUsd)
						.shiftedBy(-token.decimals)
						.toNumber();
				}
				return token;
			})
		)
	).sort((a, b) => {
		if (b.amount && a.amount) return b.amount - a.amount;
		if (b.amount) return 1;
		if (a.amount) return -1;
	});
};

// Load wallet balances
walletStore.subscribe(async (wallet) => {
	if (wallet.publicKey) {
		console.log('connected wallet: ', wallet.publicKey.toString());
		const walletBalances = await getWalletBalances(wallet.publicKey);
		console.log('walletBalances: ', walletBalances);
	}
});
