<script>
import { parseISO, format } from "date-fns"
const { name, description, used, thumbnail, date, href } = $props()
</script>

<!-- HTML -->

<li class="craftCard">
  <a {href}>
    <img src={thumbnail} alt="" />

    <div class="info">
      <p class="name">{name}</p>
      <p class="description">{description}</p>
      <p class="used">{used.flat().join(", ")}</p>
      <p class="date">{format(parseISO(date), "yyyy.MM.dd.")}</p>
    </div>
  </a>
</li>

<!-- SCSS -->

<style lang="scss">
li.craftCard {
  margin: 0;
  padding: 0;
}

li.craftCard a {
  display: flex;
  flex-flow: row nowrap;
  gap: 1.25em;

  padding: 1em;
  /* color: lightsalmon; */

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.35);
  }

  :global(body.darkmode) & {
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
    &:active {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  img {
    /* flex: 1 1 auto; */
    max-width: min(30%, 200px);
    align-self: center;
  }

  div.info {
    /* flex: 1 1 auto; */

    display: flex;
    flex-flow: column nowrap;
    gap: 0.5em;

    p {
      line-height: 1.6;
      margin: 0;
    }

    p.name {
      font-size: 1.2em;
      font-weight: bold;
    }

    p.used {
      font-size: 1.2em;
      font-family: "Ubuntu Light Italic";
    }

    p.date {
      margin-top: auto;
    }
  }
}
</style>
