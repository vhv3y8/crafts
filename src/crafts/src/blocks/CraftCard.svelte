<script>
import { options } from "$lib/state.svelte"

const { name, description, used, thumbnail } = $props()
</script>

<!-- HTML -->

<li>
  <img src={thumbnail} alt="" />

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

  /* border: 1px solid #999; */
  padding: 0.5em;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  :global(body.darkmode) &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  img {
    max-width: max(200px, calc(100% - 2em));
  }

  p {
    margin: 0;
    line-height: 1.6;

    &.name {
      font-size: 1.2em;
      font-weight: bold;
      align-self: flex-start;

      /* a {
        padding: 0.2em;

        &:hover {
          text-decoration: 3px underline black;
        }
        &:active {
          text-decoration: none;
          background-color: #333;
          color: white;
        }

        :global(body.darkmode) &:hover {
          text-decoration: 3px underline #ccc;
        }
        :global(body.darkmode) &:active {
          text-decoration: none;
          background-color: #ccc;
          color: #111;
        }
      } */
    }

    &.used {
      font-size: 1.2em;
      font-family: "Ubuntu Light Italic";
    }
  }
}
</style>
