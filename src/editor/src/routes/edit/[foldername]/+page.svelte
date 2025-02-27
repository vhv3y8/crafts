<script>
import EditPageForm from "../EditPageForm.svelte"

const { data } = $props()
const { name, description, used, thumbnail, date } = data.info
</script>

<!-- HTML -->

<EditPageForm
  isEditing={true}
  foldername={data.foldername}
  {name}
  {description}
  {used}
  {thumbnail}
  {date}
/>

<!-- SCSS -->

<style lang="scss">
</style>
