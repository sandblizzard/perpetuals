<script lang="ts">
   import { page } from '$app/stores';

	
	import { onMount } from 'svelte';
	import { clusterApiUrl } from '@solana/web3.js';
	import { WalletProvider } from '@svelte-on-solana/wallet-adapter-ui';
	import { AnchorConnectionProvider } from '@svelte-on-solana/wallet-adapter-anchor';
	import '../app.css';
	import { WalletMultiButton } from '@svelte-on-solana/wallet-adapter-ui';

	const localStorageKey = 'walletAdapter';
	const network = clusterApiUrl('devnet');
	let wallets;


	console.log("page: ",$page.route.id)

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
</script>

<div>
	<div class="container py-3"> <WalletProvider {localStorageKey} {wallets} autoConnect /></div>
	
	<div>
		<div class="wrapper-app">
			<div>
				<WalletMultiButton />
			</div>
			<div class="title">
				<h1 class="text-8xl sky-300 font-pixel">SANDBLIZZARD</h1>
				<h2 class="text-4xl sky-300 font-pixel">PERPETUAL DEX</h2>
			</div>

			<div class=" container mx-auto flex flex-col m-6 gap-y-1">
				<div class="container mx-auto flex flex-col gap-3 py-4 max-w-xs bg-green-900 justify-items-center items-center px-5 rounded-md">
					<div
						class="container flex flex-row bg-black   justify-center ext-8xl sky-300"
					>
						<div class="px-1 py-2"><a class={`${$page.route.id === "/long" ? "active-action":""}`} href="/long">Long</a></div>
						<div class="px-1 py-2" ><a class={`${$page.route.id === "/short" ? "active-action":""}`} href="/short">Short</a></div>
						<div class="px-1 py-2">
							<a class={`${$page.route.id === "/swap" ? "active-action":""}`} href="/swap">Swap</a>
						</div >
						<div class="px-1 py-2"><a class={`px-8 py-2 rounded-sm ${$page.route.id === "/earn" ? "active-action":""}`} href="/earn">Earn</a></div>
					</div>

					<div class="container max-w-lg">
						<div class="container flex flex-col j">
							<div class="container flex flex-row justify-between ">
									<p class="text-base">You pay</p>
									<div class="flex flex-row items-center gap-1"><p class="text-base">4,3223</p> <p class="text-sm">sol balance</p></div>
							</div>
							<div class="container bg-slate-800 py-1 px-2 flex flex-row justify-around rounded-md  ">
								<div class="flex items-center">
									<img />
									<p>SOL</p>
									<p>></p>
								</div>
								<div class="flex flex-col">
									<p>5.5</p>
									<p class="text-sm">$ 90.19</p>
								</div>
							</div>
						</div>
					</div>

					<div class="container max-w-lg">
						<div class="container flex flex-col j">
							<div class="container flex flex-row justify-between ">
									<p class="text-base">You short</p>
									
							</div>
							<div class="container bg-slate-800 py-1 px-2 flex flex-row justify-around rounded-md  ">
								<div class="flex items-center">
									<img />
									<p>SOL</p>
									<p>></p>
								</div>
								<div class="flex flex-col">
									<p>5.5</p>
									<p class="text-sm">$ 90.19</p>
								</div>
							</div>
						</div>
					</div>

					<div class="container max-w-lg">
						<div class="container flex flex-col ">
							<div class="container flex flex-row justify-between ">
									<p class="text-base">Pool</p>
									
							</div>
							<div class="container bg-slate-800 py-1 px-2 flex flex-row justify-around rounded-md  ">
								<div class="flex items-center">
									<img />
									<p>My awesome pool</p>
								</div>
								<div class="flex flex-col">
									>
								</div>
							</div>
						</div>
					</div>
					<div class="container max-w-lg">
						<div class="container flex flex-row justify-between items-center ">
							<p class="text-small">Leverage</p>
							<div> --------------</div>
							<div> 15x</div>
						</div>
					</div>

					<div class="container max-w-lg">
						<button class="container bg-fuchsia-500 	rounded-md">Place Order</button>
					</div>
				</div>
				<div class="container mx-auto flex flex-col gap-3 py-4 max-w-xs bg-slate-900 justify-items-center items-center px-5 rounded-md">
					<button class="container bg-fuchsia-500 	rounded-md">Place Order</button>
				</div>
			</div>
		</div>
	</div>
</div>
<slot />

<style style="postcss">
	:global(body) {
		margin: 0;
		background-color: #000000;
		color: aliceblue;
	}

	:global(p) {
		font-family: pixel;
		font-size: 24px;
	}
	.wrapper-app {
		height: 100vh;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}

	.active-action {
		background-color: white;
		color: blue;
	}
a:active{
	background-color: blue;
}

	.title {
		text-align: center;
		color: white;
		font-size: 20px;
		margin-bottom: 40px;
	}
</style>
