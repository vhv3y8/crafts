<script>
import ShadowedButton from "../../components/ShadowedButton.svelte"
import { format, parseISO } from "date-fns"

let {
  isEditing,
  name,
  description,
  used,
  thumbnail,
  date = new Date().toISOString(),
  foldername,
} = $props()

let usedInput = $state(null)
let usedInputEnterBtn = $state(null)
let usedState = $state(used)

function selectInputOnClick(e) {
  e.target.select()
}

async function handleSubmit(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  // Append used array to form data
  formData.append("used", JSON.stringify(usedState || []))

  console.log("from handleSubmit", formData) // dev

  // TODO: Validation

  const res = await fetch(e.target.action, {
    method: e.target.method,
    body: formData,
  })
  if (res.ok) {
    window.location.href = "/"
  }
}

function pushToUsed(value) {
  usedState.push(value)
  usedInput.value = ""
}
</script>

<!-- HTML -->

<div class="editPageContainer">
  <h3>Craft 카드 {isEditing ? "수정하기" : "생성하기"}</h3>

  <form
    action={isEditing ? "/edit?/edit" : "/edit?/create"}
    method="post"
    enctype="multipart/form-data"
    onsubmit={handleSubmit}
  >
    <input
      type="text"
      name="foldername"
      id=""
      value={foldername}
      style:display="none"
    />

    <div>
      <p class="description">Craft 이름</p>
      <input
        type="text"
        name="name"
        id="name"
        spellcheck="false"
        value={name}
        onclick={selectInputOnClick}
        onchange={!isEditing
          ? (e) => {
              foldername = e.target.value.toLowerCase().split(" ").join("-")
              console.log("foldername", foldername) // dev
            }
          : () => {}}
      />
    </div>

    <div>
      <p class="description">간단한 설명</p>
      <input
        type="text"
        name="description"
        id="name"
        value={description}
        spellcheck="false"
        style:font-size="1rem"
        onclick={selectInputOnClick}
      />
    </div>

    <div>
      <p class="description">메인 기점 날짜</p>
      <input
        type="date"
        name="date"
        id="date"
        value={format(parseISO(date), "yyyy-MM-dd")}
      />
    </div>

    <div>
      <p class="description">사용한 프레임워크, 라이브러리, api</p>
      <p style:display="flex" style:gap="1em">
        <input
          bind:this={usedInput}
          type="text"
          onkeydown={(e) => {
            if (e.key === "Enter") {
              pushToUsed(usedInput.value)
            }
          }}
          onclick={selectInputOnClick}
          style:flex-grow="1"
        />
        <ShadowedButton
          bind:this={usedInputEnterBtn}
          color="currentColor"
          content="Enter"
          onclick={() => {
            pushToUsed(usedInput.value)
          }}
        />
      </p>
      <ul id="usedList">
        {#each usedState as usedItem}
          <li>
            <span>{usedItem}</span>
            <button
              type="button"
              onclick={() => {
                usedState = usedState.filter((item) => item !== usedItem)
              }}>눌러서 삭제</button
            >
          </li>
        {/each}
      </ul>
    </div>

    <div>
      <p class="description">썸네일</p>
      <input
        type="file"
        name="thumbnail"
        accept="image/*"
        onchange={(e) => {
          const input = e.target
          if (input.files) {
            const files = input.files
            thumbnail = URL.createObjectURL(files[0])
          }
        }}
      />
      <img class="thumbnail" src={thumbnail} alt="이미지" />
    </div>

    <div id="submitDiv" style:text-align="end">
      <ShadowedButton
        type="submit"
        color="currentColor"
        content={`${isEditing ? "수정하기" : "만들기"} Ctrl + Enter`}
      />
    </div>
  </form>
</div>

<!-- SCSS -->

<style lang="scss">
div.editPageContainer {
  flex: 1 1 auto;
  align-self: center;

  width: min(100%, 600px);

  padding: 1.5em;
  margin-bottom: 1em;
  /* background-color: rgba(255, 255, 255, 0.15); */
  background-color: rgba(255, 255, 255, 0.25);
  :global(body.darkmode) & {
    background-color: rgba(0, 0, 0, 0.15);
  }

  font-size: 18px;
  font-family: "Nanum Square", "Ubuntu";

  display: flex;
  flex-flow: column nowrap;
  gap: 1.5em;

  h3 {
    margin: 0;
    /* margin-bottom: 1.5em; */
    font-size: 1em;
  }

  p {
    margin: 0;
  }
}

form {
  flex: 1 0 auto;

  display: flex;
  flex-flow: column nowrap;
  gap: 2em;

  & > div {
    display: flex;
    flex-flow: column nowrap;
  }

  p.description {
    margin-bottom: 0.5em;

    font-weight: bold;
  }

  input[type="text"] {
    border: none;
    outline: none;

    font-size: 18px;
    padding: 0.7em;

    /* background-color: rgba(255, 255, 255, 0.9); */
    background-color: white;

    color: rgb(22, 75, 44);
    :global(body.darkmode) & {
      color: #c06749;
    }
  }

  img.thumbnail {
    max-width: 100%;
  }

  ul#usedList {
    margin: 0;
    padding: 0;
    list-style: none;

    display: flex;
    flex-flow: column nowrap;
    gap: 1em;
  }

  div#submitDiv {
    margin-top: auto;
  }
}
</style>
