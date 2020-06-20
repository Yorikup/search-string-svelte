<script>
	import { debounce } from './utils';
	import { onMount } from 'svelte';

	let searchTemplate = '';
	let foundResults = [];
	let showResults = false;
	let pickedResult = 0;

	onMount(() => {
		document.addEventListener('click', closeResultsPanel);
	});

	$: haveResults = foundResults.length > 0;

	function closeResultsPanel() {
		showResults = false;
	}

	const search = debounce(() => {
		console.log(searchTemplate);
	}, 200);

	function handleKeydown(event) {
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				pickNext();
				break;
			case 'ArrowUp':
				event.preventDefault();
				pickPrev();
				break;
			case 'Enter':
				pickResult();
				break;
			default:
				break;
		}
	}

	function pickNext() {
		pickedResult = (pickedResult === foundResults.length - 1) ? 0 : pickedResult + 1;
	}

	function pickPrev() {
		pickedResult = (pickedResult === 0) ? foundResults.length - 1 : pickedResult - 1;
	}

	function pickResult() {
		if(haveResults) {
			searchTemplate = foundResults[pickedResult];
			closeResultsPanel();
		}
	}

	function pickFromResults(result) {
		searchTemplate = result;
		closeResultsPanel();
	}
</script>

<svelte:options tag="search-string"/>

<div class="search-wrap">
	<input
		class="search-input"
		type="text"
		bind:value={searchTemplate}
		placeholder="Поиск"
		on:click|stopPropagation
		on:keydown={handleKeydown}
		on:focus={search}
		on:input={search}
	/>
	{#if showResults && haveResults}
		<div class="search-results">
			{#each foundResults as result, index}
				<div class="search-result-card"

				>
					<div class="search-result"
						 class:picked="{ index === pickedResult }"
						 on:click={pickFromResults(result)}
					>
						{ result }
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.search-wrap {
		position: relative;
	}

	.search-input {
		width: 100%;
		padding: 8px;
		box-sizing: border-box;
		border: 1px solid #CCC;
		border-radius: 2px;
		font-size: 14px;
		transition: 0.3s;
	}

	.search-input:focus {
		outline: none;
		border-color: darkblue;
	}

	.search-results {
		position: absolute;
		z-index: 100;
		width: 100%;
		background-color: #FFF;
		border: 1px solid #CCC;
		border-radius: 2px;
	}

	.search-result-card {
		background-color: #FFF;
	}

	.picked {
		background-color: #F6F6F7;
	}

	.search-result {
		cursor: pointer;
		padding: 8px 16px;
	}

	.search-result:hover {
		background-color: #F6F6F7;
	}
</style>
