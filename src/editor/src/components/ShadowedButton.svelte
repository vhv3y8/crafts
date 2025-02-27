<script>
const { color, content, onclick, type = "button" } = $props()
</script>

<!-- HTML -->

<button
  class="shadowedBtn"
  style:box-shadow-color={color}
  style:color
  {onclick}
  {type}
>
  {content}
</button>

<!-- SCSS -->

<style lang="scss">
button.shadowedBtn {
  position: relative;
  box-shadow: 5px 6px;
  margin-right: 5px;
  margin-bottom: 6px;

  border: 3px solid;

  /* background-color: rgba(255, 255, 255, 0.2);
  :global(body.darkmode) & {
    background-color: rgba(0, 0, 0, 0);
  } */
  background-color: inherit;

  padding: 0.5em 0.7em;
  font-size: 18px;
  font-weight: bold;

  &:hover,
  &:active {
    background-color: rgba(255, 255, 255, 0.2);
    :global(body.darkmode) & {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  &:hover {
    cursor: pointer;
  }
  &:active {
    box-shadow: none;
    top: 5px;
    left: 6px;
  }
}
</style>
