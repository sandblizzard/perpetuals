<script lang="ts">
	import type { Pool } from '../helpers/globalStore';
	import type { SelectorItem } from '../helpers/types';

	let listRef: HTMLUListElement = null;

	export let items: Pool[] = [];
	export let selectedItem = undefined;
	export let showDropdown: boolean = false;

	export let selectedIndex: number = 0;
	let selectedId: string = '';
	let previousMod = 0;

	const handleKeydown = (event: KeyboardEvent) => {
		event.preventDefault();
		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			if (selectedIndex === -1) {
				selectedIndex = 0;
			} else {
				if (event.key === 'ArrowDown') {
					selectedIndex += 1;
				} else {
					selectedIndex -= 1;
					if (selectedIndex < 0) selectedIndex = 0;
				}
				selectedIndex = Math.abs(selectedIndex) % items.length;
			}

			selectedId = items[selectedIndex].id;

			const searchTokenList = document.getElementById('searchTokenList');
			const hoverToken = document.getElementById(selectedId);

			const currentMod = hoverToken.offsetTop % searchTokenList.clientHeight;

			if (previousMod >= currentMod) {
				searchTokenList.scrollTo(0, hoverToken.offsetTop);
			}
			previousMod = hoverToken.offsetTop % searchTokenList.clientHeight;
		}

		if (event.key === 'Enter' && selectedIndex !== -1) {
			selectedItem = items[selectedIndex];
			selectedIndex = -1;
		}
	};
</script>

<svelte:window on:keydown={handleKeydown} />

<ul
	bind:this={listRef}
	id="searchTokenList"
	class={`flex absolute top-0 left-0 right-0 flex-col h-15  z-10 absolute  w-120 overflow-scroll  bg-slate-800 rounded-md ${
		showDropdown ? '' : 'hidden'
	}`}
>
	{#each items as item, index}
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<li
			tabindex={index}
			id={`${item.id}`}
			class={`hover:bg-sky-700 focus:bg-sky-700 cursor-pointer ${
				index === selectedIndex ? 'bg-sky-700' : ''
			}`}
		>
			<div
				on:click={() => {
					selectedIndex = index;
					selectedItem = item;
					showDropdown = false;
				}}
				on:keydown={(event) => {
					if (event.key === 'Enter') {
						selectedIndex = index;
						showDropdown = false;
					}
				}}
			>
				<slot {item} />
			</div>
		</li>
	{/each}
</ul>
