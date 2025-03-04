<script>
import { options } from "$lib/state.svelte"

const { name, description, used, thumbnail, openImgModal } = $props()
</script>

<!-- HTML -->

<li>
  <button
    type="button"
    onclick={() => {
      openImgModal(thumbnail)
    }}
  >
    <img src={thumbnail} alt="" />
  </button>

  {#if options.showDescription}
    {#if name}
      <p class="name">
        {name}
      </p>
    {/if}

    <p>{description}</p>
  {/if}

  {#if options.showUsed}
    <p class="used">{used.flat().join(", ")}</p>
  {/if}
</li>

<!-- SCSS -->

<style lang="scss">
li {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  gap: 0.5em;

  padding: 0.5em;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  :global(body.darkmode) &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  button {
    outline: none;
    border: none;
    background: transparent;

    display: inline-flex;
    justify-content: center;

    img {
      /* max-width: calc(100% - 2em); */
      max-width: 100%;
    }
  }

  p {
    margin: 0;
    line-height: 1.6;

    &.name {
      font-size: 1.2em;
      align-self: flex-start;
      font-family: "Ubuntu";
    }

    &.used {
      font-size: 1.2em;
      font-family: "Ubuntu Light Italic";
      text-align: center;
    }
  }
}
</style>
