<script>
import CraftCard from "./CraftCard.svelte"
import ShadowedButton from "../components/ShadowedButton.svelte"
import { base } from "$app/paths"

const { data } = $props()
</script>

<!-- HTML -->

<header>
  <p style:font-weight="bold">
    * Craft 카드를 클릭해서 수정 페이지로 이동하세요.
  </p>
  <p style:text-align="right">
    <ShadowedButton
      color="currentColor"
      content="Craft 생성하기"
      onclick={() => {
        window.location.href = "/edit"
      }}
    />
  </p>
</header>

<ul id="craftList">
  {#each data.infos as { name, description, used, thumbnail, date, folderName }}
    <CraftCard
      {name}
      {description}
      {used}
      {thumbnail}
      {date}
      href={`edit/${folderName}`}
    />
  {/each}
</ul>

<!-- SCSS -->

<style lang="scss">
header {
  padding-inline: 0.5em;
  padding-top: 0.5em;
  padding-bottom: 0.7em;

  border-block: 3px solid #2b5235;
  margin-bottom: 1em;

  /* color: #41784f; */
  font-weight: bold;
  /* color: darksalmon; */

  position: sticky;
  user-select: none;

  :global(body.darkmode) & {
    border-block-color: darksalmon;
  }

  p {
    margin: 0;
  }
}

ul#craftList {
  flex: 1 0 auto;

  margin: 0;
  padding: 0;
  list-style: none;

  display: flex;
  flex-flow: column nowrap;
  gap: 0.6em;
}
</style>
