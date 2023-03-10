<script lang="ts">
	import { WalletMultiButton, WalletProvider } from '@svelte-on-solana/wallet-adapter-ui';
	import { onMount } from 'svelte';
	import { getHeliusRPC } from '../helpers';
	import { network, NETWORKS, type Network } from '../helpers/networkStore';
	import Selector from './selector.svelte';
	const localStorageKey = 'walletAdapter';
	let wallets;

	onMount(async () => {
		const {
			PhantomWalletAdapter,
			SlopeWalletAdapter,
			SolflareWalletAdapter,
			SolletExtensionWalletAdapter,
			TorusWalletAdapter
		} = await import('@solana/wallet-adapter-wallets');

		const walletsMap = [
			new PhantomWalletAdapter(),
			new SlopeWalletAdapter(),
			new SolflareWalletAdapter(),
			new SolletExtensionWalletAdapter(),
			new TorusWalletAdapter()
		];

		wallets = walletsMap;
	});

	let selectedNetwork = $network;

	$: {
		network.set({ ...selectedNetwork, url: getHeliusRPC(selectedNetwork.value) });
	}
</script>

<WalletProvider {localStorageKey} {wallets} autoConnect />
<div class="flex justify-between px-10 items-center ">
	<div class="flex flex-col gap-0 w-auto">
		<h2 class="text-6xl text-sky-300 font-pixel m-0 p-0">BLIZZARD</h2>
		<p class=" px-10 text-lg font-pixel">a PERPETUAL DEX</p>
	</div>

	<div class="flex flex-row gap-3 items-center">
		<div
			class="flex flex-col gap-0 !w-32 !min-w-32
		"
		>
			<p class="font-pixel text-sm">Network</p>
			<Selector
				selectedItem={selectedNetwork}
				title="Network"
				items={NETWORKS}
				showDropdown={false}
				allowRemove={false}
				let:item
			/>
		</div>
		<div>
			<WalletMultiButton />
		</div>
	</div>
</div>
