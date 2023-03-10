<script lang="ts">
	import type { Pool } from '../helpers/globalStore';
	import type { SelectorItem } from '../helpers/types';
	import SelectorList from './selectorList.svelte';

	let listRef: HTMLUListElement = null;

	export let title = 'Select pool';
	export let items: Pool[] = [];
	export let selectedItem = undefined;
	export let showDropdown: boolean = false;
	export let allowRemove: boolean = true;

	let selectedIndex: number = 0;
</script>

<div class="relative ">
	<div class="flex flex-row justify-between">
		<button
			id="search"
			placeholder={title}
			on:click={() => {
				showDropdown = !showDropdown;
				selectedIndex = 0;
				listRef.focus();
			}}
			class="z-1000  text-slate-200 outline-none text-left bg-transparent placeholder-shown:border-gray-500"
			><div class="">
				{#if selectedItem}
					<p class="font-pixel">{selectedItem.label}</p>
				{:else}
					<p class="font-pixel text-slate-400">{title}</p>
				{/if}
			</div>
		</button>
		{#if allowRemove && selectedItem}
			<button
				on:click={() => {
					selectedIndex = 0;
					selectedItem = undefined;
					showDropdown = false;
				}}>{'x'}</button
			>
		{/if}
	</div>

	{#if showDropdown && false}
		<SelectorList {items} bind:selectedItem bind:selectedIndex let:item {showDropdown}>
			<slot {item} /></SelectorList
		>
	{/if}
</div>
