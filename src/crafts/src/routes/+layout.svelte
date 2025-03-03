<script>
import "$lib/scss/index.scss"

const { children } = $props()
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

  {@render children()}
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
</style>
