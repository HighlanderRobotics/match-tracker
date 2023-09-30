<script lang="ts">
  import { localizedMatchKey, type MatchKey } from "$lib/types/match";
  import { Button, DensityProvider } from "magnolia-ui-svelte";
  import type { PageServerData } from "./$types";
  import { invalidateAll } from "$app/navigation";
  import { onMount } from "svelte";

  export let data: PageServerData;

  onMount(() => {
    setInterval(invalidateAll, 60000);
  })
</script>

<svelte:head>
  <title>On {localizedMatchKey(data.nextMatch.match.key)} | Match Tracker</title>
</svelte:head>

<div class="content">
  <div class="progress-container">
    <div class="overline">
      <h1>
        {data.previousTeamMatch === undefined
          ? "QM 1"
          : localizedMatchKey(data.previousTeamMatch?.match?.key)}
      </h1>
      <h1>{localizedMatchKey(data.nextTeamMatch.match.key)}</h1>
    </div>
    <div class="progress-bar">
      <div class="shaded-region" style:width={`${((data.nextMatch.match.ordinalNumber - (data.previousTeamMatch?.match?.ordinalNumber || 1)) / ((data.nextTeamMatch?.match.ordinalNumber || 1) - (data.previousTeamMatch?.match?.ordinalNumber || 0))) * 100}%`} />
      <span class="next-match">
        <h1>{localizedMatchKey(data.nextMatch.match.key)}</h1>
      </span>
    </div>
  </div>
</div>

<div class="data-age">
  <p>Last updated {data.timestamp.toLocaleTimeString()}</p>
  <DensityProvider density="compact">
    <Button
      variant="secondary"
      on:click={() => {
        invalidateAll();
      }}>Update now</Button>
  </DensityProvider>
</div>

<style>
  .content {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-direction: column;
    padding: 50px;
  }

  .overline {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .progress-bar {
    height: 50px;
    border-radius: 7px;
    background-color: var(--secondary-container);
    display: flex;
    flex-direction: row;
  }

  .next-match {
    width: 0;
  }

  .next-match h1 {
    width: max-content;
    transform: translate(-50%, 100%);
  }

  .shaded-region {
    background-color: var(--victory-purple);
    height: 100%;
    border-radius: 7px;
    transition: 0.5s ease;
  }

  .data-age {
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
  }
</style>
