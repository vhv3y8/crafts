<script>
import CheckboxLabel from "../components/CheckboxLabel.svelte"
import { options } from "$lib/state.svelte"
</script>

<!-- HTML -->

<header id="topbar">
  <ul id="option">
    <li>
      <CheckboxLabel
        inputId="showDescription"
        bind:checked={options.showDescription}
        imgSrc={options.isDarkMode
          ? "/assets/description-dark.svg"
          : "/assets/description.svg"}
        name="설명"
      />
    </li>
    <li>
      <CheckboxLabel
        inputId="showUsed"
        bind:checked={options.showUsed}
        imgSrc={options.isDarkMode
          ? "/assets/code-dark.svg"
          : "/assets/code.svg"}
        name="기술"
      />
    </li>
  </ul>

  <button id="toggleDarkModeBtn">
    <label for="toggleDarkMode">
      <input
        type="checkbox"
        name="toggleDarkMode"
        id="toggleDarkMode"
        bind:checked={options.isDarkMode}
        style:display="none"
        onchange={() => {
          console.log(options)
        }}
      />
      <img
        src={options.isDarkMode
          ? "/assets/darkmode-dark.svg"
          : "/assets/darkmode.svg"}
        alt=""
        width="24"
        height="24"
      />
      <span>{options.isDarkMode ? "라이트 모드" : "다크 모드"}</span>
    </label>
  </button>
</header>

<!-- SCSS -->

<style lang="scss">
header#topbar {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  padding-bottom: 0.5rem;
  border-bottom: 3px solid #333;
  margin-bottom: 2rem;

  :global(body.darkmode) & {
    border-width: 2px;
    border-color: #ccc;
  }
}

ul#option {
  list-style: none;
  margin: 0;
  padding: 0;

  flex: 1 0 auto;

  display: flex;
  flex-flow: row nowrap;
  column-gap: 0.5rem;
  align-items: center;
}

button#toggleDarkModeBtn {
  border: none;
  outline: none;
  background-color: transparent;

  padding: 0;
  color: inherit;

  & label {
    padding: 0.5em 0.5em;
    border-radius: 0.3em;

    user-select: none;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    column-gap: 0.5em;

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
}
</style>
