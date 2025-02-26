<script>
let {
  inputId,
  checked = $bindable(),
  imgSrc,
  name,
  hideCheckbox = false,
} = $props()
</script>

<!-- HTML -->

<label for={inputId}>
  <input
    type="checkbox"
    name={inputId}
    id={inputId}
    bind:checked
    class={hideCheckbox ? "hideCheckbox" : ""}
  />
  <img src={imgSrc} alt="" />
  <span> {name} </span>
</label>

<!-- SCSS -->

<style lang="scss">
label {
  padding: 0.5em 0.4em;
  border-radius: 0.3em;

  user-select: none;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  column-gap: 0.2em;

  img {
    width: 0.9em;
    height: 0.9em;
  }

  input[type="checkbox"] {
    margin-right: 0.3em;

    appearance: none;
    font: inherit;
    color: currentColor;
    width: 1.2em;
    height: 1.2em;
    border: 0.2em solid currentColor;
    border-radius: 0.15em;
    transform: translateY(-0.075em);

    &:checked::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      height: 80%;
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
      background-color: currentColor;
    }

    &.hideCheckbox {
      display: none;
    }
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.3);
  }

  :global(body.darkmode) &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  :global(body.darkmode) &:active {
    background-color: rgba(255, 255, 255, 0.3);
  }
}
</style>
