<script>
import HeaderTopBar from "../blocks/HeaderTopBar.svelte"
import CraftCard from "../blocks/CraftCard.svelte"
import { options } from "$lib/state.svelte"

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

<div class="container">
  <p
    style:margin-top="0"
    style:font-family="Ubuntu Light Italic"
    style:font-size="1.2em"
    style:user-select="none"
  >
    vhv3y8/crafts
  </p>

  <HeaderTopBar />

  <ul id="craftList">
    {#each data.infos as { name, description, used, thumbnail }}
      <CraftCard {name} {description} {used} {thumbnail} />
    {/each}
  </ul>

  <footer>
    inspired by <a
      href="https://leroyrosales.com/"
      target="_blank"
      style:text-decoration="3px underline currentColor">leroyrosales.com</a
    >
  </footer>
</div>

<!-- SCSS -->

<style lang="scss">
:global(body) {
  margin: 0;
  padding: 1.5rem;
  height: calc(100vh - 3rem);

  display: flex;
  flex-flow: column nowrap;
}

:global(body.darkmode) {
  background-color: #121212;
  color: #ddd;
}

div.container {
  width: min(100%, 1200px);
  flex: 1 0 auto;
  margin: auto;

  display: flex;
  flex-flow: column nowrap;
}

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
}
</style>
