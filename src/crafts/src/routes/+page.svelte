<script>
import HeaderTopBar from "../blocks/HeaderTopBar.svelte"
import CraftCard from "../blocks/CraftCard.svelte"
import { options } from "$lib/state.svelte"
import { base } from "$app/paths"

const { data } = $props()
let modalImgSrc = $state("")
let modalContainer = $state(null)

$effect(() => {
  if (options.isDarkMode) {
    document.body.classList.add("darkmode")
  } else {
    document.body.classList.remove("darkmode")
  }
})

function openImgModal(src) {
  console.log("openImgModal", src)
  modalImgSrc = src
  modalContainer.style.display = "block"
}
</script>

<!-- HTML -->

<HeaderTopBar />

<ul id="craftList">
  {#each data.infos as { name, description, used, thumbnail }}
    <CraftCard {name} {description} {used} {thumbnail} {openImgModal} />
  {/each}
</ul>

<button
  bind:this={modalContainer}
  id="modalContainer"
  style:display="none"
  onclick={(e) => {
    modalContainer.style.display = "none"
  }}
>
  <img id="modal" src={modalImgSrc} alt="" />
</button>

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

button#modalContainer {
  outline: none;
  border: none;
  background: inherit;

  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  display: grid;
  place-items: center;

  backdrop-filter: blur(5px);

  img {
    max-width: calc(100% - 3em);
  }
}

footer {
  margin-block: 1em;

  a {
    text-decoration: 3px underline currentColor;
  }
}
</style>
