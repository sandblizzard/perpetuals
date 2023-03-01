import * as web3 from '@solana/web3.js';
import * as spl from '@solana/spl-token';
import { BigNumber as BN } from 'bignumber.js';
const getHeliusRPC = (cluster: web3.Cluster, path?: string): string => {
	switch (cluster) {
		case 'mainnet-beta':
			return `https://rpc.helius.xyz/${path}?api-key=${process.env.HELIUS_API_KEY}`;
		case 'devnet':
			return `https://rpc-devnet.helius.xyz/${path}?api-key=${process.env.HELIUS_API_KEY}`;
		default:
			throw new Error('Invalid cluster');
	}
};

const getHeliusAPI = (path?: string): string => {
	return `https://api.helius.xyz/${path}?api-key=${process.env.HELIUS_API_KEY}`;
};

/**
 * getTokenBalance gets the balance of a specific token for a specific owner
 * @param tokenMintAddress
 * @param ownerAddress
 * @returns
 */
export const getTokenBalance = async (
	tokenMintAddress: string,
	ownerAddress?: web3.PublicKey
): Promise<BN> => {
	if (!ownerAddress) return new BN(0);
	const connection = new web3.Connection(getHeliusRPC('mainnet-beta'), 'confirmed');
	try {
		const ata = await spl.getAssociatedTokenAddress(
			new web3.PublicKey(tokenMintAddress),
			ownerAddress
		);
		const mint = await spl.getMint(connection, new web3.PublicKey(tokenMintAddress));
		const tokenAccount = await spl.getAccount(connection, ata);
		return new BN(tokenAccount.amount.toString()).shiftedBy(-mint.decimals);
	} catch (err) {
		return new BN(0);
	}
};

export type HeliusGetWalletBalanceResponse = {
	nativeBalance: number;
	tokens: HeliusToken[];
};

type HeliusToken = {
	amount: number;
	decimals: number;
	mint: string;
	tokenAccount: string;
};

/**
 * getWalletBalances gets the balances of all tokens for a specific wallet
 * @param wallet
 * @returns
 */
export const getWalletBalances = async (
	wallet: web3.PublicKey
): Promise<HeliusGetWalletBalanceResponse> => {
	const path = `v0/addresses/${wallet.toString()}/balances`;
	const endpoint = getHeliusAPI(path);
	const response = await fetch(endpoint);
	if (!response.ok) throw new Error('Failed to fetch wallet balances' + response.statusText);
	const data: HeliusGetWalletBalanceResponse = await response.json();

	// filter out NFTS
	data.tokens = data.tokens.filter((token) => token.decimals !== 0);
	return data;
};

type CoinGeckoSimplePrice = Record<string, Record<string, number>>;

export const fetchCoingeckoPriceFromId = async (
	id: string,
	currency: string
): Promise<CoinGeckoSimplePrice> => {
	const cgUrl =
		'https://api.coingecko.com/api/v3/simple/price?ids=' + id + '&vs_currencies=' + currency;
	const response = await fetch(cgUrl);
	if (!response.ok) throw new Error('Failed to fetch simple price' + response.statusText);
	return await response.json();
};
