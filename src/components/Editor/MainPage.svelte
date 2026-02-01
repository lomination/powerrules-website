<script lang="ts">
  import Toolbar from "./Toolbar.svelte";
  import Editor from "./Editor.svelte";
  import Console from "./Console.svelte";
  import type { CompileResult } from "../../lib/types";
  import { defaultValue } from "../../lib/editor/editor";

  let editorContent: string = defaultValue;
  let clearConsole: () => void;
  let appendToConsole: (...args: any[]) => Promise<void>;
  let compiledOutput: CompileResult = { ok: false, error: "" };
  let tileset: File | null = null;
</script>

<div id="main-page">
  <Toolbar bind:editorContent bind:clearConsole bind:appendToConsole bind:compiledOutput bind:tileset />
  <Editor bind:editorContent />
  <Console bind:clearConsole bind:appendToConsole />
</div>

<style>
  #main-page {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>
