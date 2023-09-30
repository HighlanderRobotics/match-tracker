<script lang="ts">
  import { localizedMatchKey, type MatchKey } from "$lib/types/match";
  import { Button, DensityProvider } from "magnolia-ui-svelte";
  import type { PageServerData } from "./$types";
  import { invalidateAll } from "$app/navigation";
  import { onMount } from "svelte";

  export let data: PageServerData;

  onMount(() => {
    setInterval(invalidateAll, 120000);
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
      <div class="shaded-region" style:width={`${((data.nextMatch.match.ordinalNumber - (data.previousTeamMatch?.match?.ordinalNumber || 1)) / ((data.nextTeamMatch?.match.ordinalNumber) - (data.previousTeamMatch?.match?.ordinalNumber || 0))) * 100}%`} />
      <span class="next-match">
        <h1>{localizedMatchKey(data.nextMatch.match.key)}</h1>
      </span>
      <div class="begin-queuing" style:left={`${((data.nextTeamMatch.match.ordinalNumber - (data.previousTeamMatch?.match?.ordinalNumber || 0) - 3) / ((data.nextTeamMatch?.match.ordinalNumber) - (data.previousTeamMatch?.match?.ordinalNumber || 0))) * 100}%`}>
        <div class="indicator" />
        <p>Begin queuing</p>
      </div>
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
  .indicator {
    height: 100%;
    width: 2px;
    background-color: var(--danger);
  }

  .begin-queuing {
    position: absolute;
    height: 100%;
    transition: 0.5s ease;
  }

  .begin-queuing p {
    color: var(--danger);
    transform: translateX(-50%);
  }

  .progress-container {
    padding-bottom: 80px;
  }

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
    position: relative;
  }

  .next-match {
    width: 0;
  }

  .next-match h1 {
    width: max-content;
    transform: translate(-50%, calc(100% + 15px));
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

  .data-age p {
    color: var(--body);
  }
</style>
