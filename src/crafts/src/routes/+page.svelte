<script>
import HeaderTopBar from "../blocks/HeaderTopBar.svelte"
import CraftCard from "../blocks/CraftCard.svelte"
import { options } from "$lib/state.svelte"
import { base } from "$app/paths"

const { data } = $props()

$effect(() => {
  if (options.isDarkMode) {
    document.body.classList.add("darkmode")
  } else {
    document.body.classList.remove("darkmode")
  }
})
</script>

<!-- HTML -->

<HeaderTopBar />

<ul id="craftList">
  {#each data.infos as { name, description, used, thumbnail }}
    <CraftCard {name} {description} {used} {thumbnail} />
  {/each}
</ul>

<footer>
  <a href={`${base}/CREDITS.md`}>CREDITS.md</a> / inspired by
  <a href="https://leroyrosales.com/" target="_blank">leroyrosales.com</a>
</footer>

<!-- SCSS -->

<style lang="scss">
ul#craftList {
  flex: 1 0 auto;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  /* justify-content: center; */
  grid-auto-rows: min-content;
  gap: 1em;

  margin: 0;
  padding: 0;

  list-style: none;

  overflow-y: auto;
}

footer {
  margin-block: 1em;

  a {
    text-decoration: 3px underline currentColor;
  }
}
</style>
