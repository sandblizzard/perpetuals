import { writable } from 'svelte/store';
import { getHeliusRPC } from '.';
import type { Cluster } from '@solana/web3.js';

export const NETWORKS: Network[] = [
	{
		value: 'mainnet-beta',
		label: 'Mainnet Beta',
		id: '1'
	},
	{
		value: 'devnet',
		label: 'Devnet',
		id: '2'
	}
];

export type Network = {
	value: Cluster;
	label: string;
	id: string;
	url?: string;
};

export const network = writable<Network>(NETWORKS[0]);
