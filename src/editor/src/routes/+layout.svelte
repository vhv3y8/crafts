<script>
import "$lib/scss/index.scss"
import { options } from "$lib/state.svelte"
import { base } from "$app/paths"

const { children } = $props()

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
  <p class="top">
    <a href="/">crafts/editor</a>
    <label id="toggleDarkModeLabel" for="toggleDarkModeBtn">
      <input
        type="checkbox"
        name=""
        id="toggleDarkModeBtn"
        style:display="none"
        bind:checked={options.isDarkMode}
      />
      <img
        src={`${base}${
          options.isDarkMode
            ? "/assets/darkmode-dark.svg"
            : "/assets/darkmode.svg"
        }`}
        alt=""
        width="24"
        height="24"
      />
    </label>
  </p>

  {@render children()}
</div>

<!-- SCSS -->

<style lang="scss">
:global(html) {
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
}

:global(body) {
  flex-grow: 1;

  margin: 0;
  padding: 1.5rem;
  /* height: calc(100vh - 3rem); */

  display: flex;
  flex-flow: column nowrap;

  font-family: "Nanum Square";

  background-color: darksalmon;
  color: #2b5235;

  overflow-y: scroll;

  /* Dark Mode */
  &.darkmode {
    background-color: #2b5235;
    color: darksalmon;
  }
}

div.container {
  width: min(100%, 800px);
  flex: 1 1 auto;
  margin: auto;

  display: flex;
  flex-flow: column nowrap;
}

p.top {
  margin-top: 0;
  font-family: "Ubuntu Light Italic";
  font-size: 1.2em;
  user-select: none;
  color: black;

  position: sticky;

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  a {
    padding: 0.2em;

    &:hover {
      background-color: #333;
      color: darksalmon;
    }
    &:active {
      background-color: #444;
    }

    :global(body.darkmode) & {
      &:hover {
        background-color: white;
        color: #2b5235;
      }
      &:active {
        background-color: #ddd;
      }
    }
  }

  :global(body.darkmode) & {
    color: white;
  }

  label#toggleDarkModeLabel {
    border: none;
    outline: none;
    background-color: inherit;

    padding: 0.5em;
    border-radius: 0.2em;

    display: grid;
    place-items: center;

    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
      cursor: pointer;
    }
    &:active {
      background-color: rgba(255, 255, 255, 0.4);
    }
  }
}
</style>
