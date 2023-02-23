<script lang="ts">
	import { page } from '$app/stores';

	import Header from '../components/header.svelte';

	import '../app.css';
	import { WalletMultiButton } from '@svelte-on-solana/wallet-adapter-ui';
	import type { Event } from '@project-serum/anchor';

	// Input
	let amount: string;
	let textTimeout: any;
	const handleAmountChange = (am: KeyboardEvent) => {
		clearTimeout(textTimeout);
		textTimeout = setTimeout(() => {
			console.log('start');
			const parts = (am.target as HTMLInputElement).value.replaceAll(',', '').split('.');
			const numberPart = parts[0];
			const decimalPart = parts[1];
			amount =
				numberPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (decimalPart ? '.' + decimalPart : '');
		}, 500);
	};

	const actions = [
		{
			name: 'Long',
			path: '/long'
		},
		{
			name: 'Short',
			path: '/short'
		},
		{
			name: 'Swap',
			path: '/swap'
		},
		{
			name: 'Earn',
			path: '/earn'
		}
	];
</script>

<div>
	<Header />
	<div>
		<div class="wrapper-app">
			<div>
				<WalletMultiButton />
			</div>
			<div class="title">
				<h1 class="text-8xl sky-300 font-pixel">SANDBLIZZARD</h1>
				<h2 class="text-4xl sky-300 font-pixel">PERPETUAL DEX</h2>
			</div>

			<div class=" container mx-auto flex flex-col m-6">
				<div
					class={`container box ${$page.route.id.replace(
						'/',
						''
					)}-border mx-auto py-4 max-w-xs bg-slate-900  justify-items-center items-center px-5 rounded-md`}
				>
					<div class="flex flex-col gap-5">
						<div class=" flex flex-row justify-center">
							<div class="container flex flex-row bg-black justify-center ext-8xl sky-300">
								{#each actions as action}
									<div class="py-2">
										<a
											class={`px-4 py-2 rounded-base text-sm font-pixel ${
												$page.route.id === action.path ? 'active-action' : ''
											}`}
											href={action.path}>{action.name}</a
										>
									</div>
								{/each}
							</div>
							<div class="w-12 flex justify-center">
								<img class="cursor-pointer" height="10px" width="auto" src="drop.png" />
							</div>
						</div>

						<div class="container max-w-lg">
							<div class="container flex flex-col j">
								<div class="container flex flex-row justify-between ">
									<p class="text-base">You pay</p>
									<div class="flex flex-row items-center gap-1">
										<p class="text-base">4,3223</p>
										<p class="text-sm">sol balance</p>
									</div>
								</div>
								<div
									class="container bg-slate-800 py-1 px-5 flex flex-row justify-between rounded-md  "
								>
									<div class="flex items-center">
										<img />
										<p>SOL</p>
										<p>></p>
									</div>
									<div class="flex flex-col">
										<input
											bind:value={amount}
											on:keypress={handleAmountChange}
											placeholder="0.0"
											name="amount"
											type="text"
											class="text-base outline-none  text-right bg-transparent placeholder-shown:border-gray-500"
										/>
										<p class="text-sm text-slate-600 text-right">$ 0</p>
									</div>
								</div>
							</div>
						</div>

						<div class="container max-w-lg">
							<div class="container flex flex-col j">
								<div class="container flex flex-row justify-between ">
									<p class="text-base">You short position</p>
								</div>
								<div
									class="container bg-slate-800 py-1 px-2 flex flex-row justify-between rounded-md  "
								>
									<div class="flex items-center">
										<img />
										<p>SOL</p>
										<p>></p>
									</div>
									<div class="flex flex-col">
										<p class="text-base text-slate-800">5.5</p>
										<p class="text-sm">$ 90.19</p>
									</div>
								</div>
							</div>
						</div>

						<div class="container max-w-lg">
							<div class="container flex flex-row justify-between items-center ">
								<p class="text-small">Leverage</p>
								<div>--------------</div>
								<div>15x</div>
							</div>
						</div>

						<div class="container max-w-lg">
							<button class="container bg-fuchsia-500 rounded-md">Place Order</button>
						</div>
					</div>
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

	@keyframes glower {
		0% {
			background-position: 0 0;
		}

		100% {
			background-position: 400% 400%;
		}
	}
	.box {
		position: relative;
		display: block;
	}
	.long-border:before {
		content: '';
		position: absolute;
		border-radius: 5px;
		left: -2px;
		top: -2px;
		background: linear-gradient(45deg, transparent, #00ff66, transparent);
		background-size: 400%;
		width: calc(100% + 5px);
		height: calc(100% + 5px);
		z-index: -1;
		animation: glower 10s linear infinite;
	}

	.short-border:before {
		content: '';
		position: absolute;
		border-radius: 5px;
		left: -2px;
		top: -2px;
		background: linear-gradient(45deg, transparent, red, transparent);
		background-size: 400%;
		width: calc(100% + 5px);
		height: calc(100% + 5px);
		z-index: -1;
		animation: glower 10s linear infinite;
	}

	.swap-border:before {
		content: '';
		position: absolute;
		border-radius: 5px;
		left: -2px;
		top: -2px;
		background: linear-gradient(45deg, transparent, blue, transparent);
		background-size: 400%;
		width: calc(100% + 5px);
		height: calc(100% + 5px);
		z-index: -1;
		animation: glower 10s linear infinite;
	}

	.wrapper-app {
		height: 100vh;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}

	.active-action {
		background-color: white;
		color: blue;
	}

	.title {
		text-align: center;
		color: white;
		font-size: 20px;
		margin-bottom: 40px;
	}
</style>
