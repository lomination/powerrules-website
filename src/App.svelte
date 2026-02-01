<script lang="ts">
  import Home from "./components/Home/Home.svelte";
  import EditorPage from "./components/Editor/MainPage.svelte";
  import Wiki from "./components/Wiki/Wiki.svelte";

  let page = "editor";
</script>

<div id="app">
  <nav id="sidebar">
    <div class="logo">PowerRules</div>
    <button on:click={() => (page = "home")}>Home</button>
    <button on:click={() => (page = "editor")}>Editor</button>
    <button on:click={() => (page = "wiki")}>Wiki</button>
  </nav>

  <main>
    <div class="page" class:active={page === "home"}>
      <Home />
    </div>

    <div class="page" class:active={page === "editor"}>
      <EditorPage />
    </div>

    <div class="page" class:active={page === "wiki"}>
      <Wiki />
    </div>
  </main>
</div>

<style>
  #app {
    display: flex;
    height: 100vh;
    width: 100%;
  }

  #sidebar {
    width: 10%;
    background-color: var(--sidebar-bg);
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    border-right: 1px solid var(--border);
  }

  #sidebar .logo {
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 2rem;
    color: var(--highlight);
  }

  #sidebar button {
    background: var(--button-bg);
    border: none;
    color: var(--text);
    padding: 0.75rem 1rem;
    text-align: left;
    width: 100%;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  #sidebar button:hover {
    background: var(--sidebar-hover);
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

  .page {
    display: none;
    flex: 1;
    height: 100%;
  }

  .page.active {
    display: flex;
    flex-direction: column;
  }
</style>
