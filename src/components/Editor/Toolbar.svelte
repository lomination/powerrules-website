<script lang="ts">
  import grassTemplate from "../../lib/templates/grass.powerrules?raw";
  import genericTemplate from "../../lib/templates/generic.powerrules?raw";
  import freezeTemplate from "../../lib/templates/freeze.powerrules?raw";
  import type { CompileResult } from "../../lib/types";
  import { PowerRulesCompiler } from "../../lib/compiler/compiler";

  export let editorContent: string;
  export let clearConsole: () => void;
  export let appendToConsole: (...args: any[]) => Promise<void>;
  export let compiledOutput: CompileResult;
  export let tileset: File | null;

  let selectedTemplate: string = "";
  let compilerVersion: string = "0.6.0";

  let fileInputElement: HTMLInputElement;
  let tilesetInputElement: HTMLInputElement;

  function loadLocalFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (!file.type.startsWith("text/")) {
      alert("Please select a text file!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      editorContent = reader.result as string;
    };
    reader.readAsText(file);
  }

  function loadTemplate() {
    if (!selectedTemplate || selectedTemplate === "") return;

    if (selectedTemplate === "grass") {
      editorContent = grassTemplate;
    } else if (selectedTemplate === "generic") {
      editorContent = genericTemplate;
    } else if (selectedTemplate === "freeze") {
      editorContent = freezeTemplate;
    }

    selectedTemplate = "";
  }

  function loadTileset(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file!");
      return;
    }

    // TODO: check dimensions

    tileset = file;
  }

  function compile(): void {
    const originalLog = console.log;
    console.log = (...arg) => {
      originalLog(arg);
      appendToConsole(arg);
    };

    clearConsole();

    try {
      const compiled: string = PowerRulesCompiler.compile(editorContent);
      compiledOutput = { ok: true, output: compiled };
      appendToConsole("\n--------------------\n\nCompilaion succeeded");
    } catch (err) {
      compiledOutput = {
        ok: false,
        error: (err as Error).message || "Unknown error",
      };
      appendToConsole(`\n--------------------\n\nCompilaion failed:\n${compiledOutput.error}`);
    }

    console.log = originalLog;
  }

  function downloadCompiled() {
    if (!compiledOutput || !compiledOutput.ok) return;

    const blob = new Blob([compiledOutput.output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = tileset ? tileset.name + ".rules" : "powerrules-output.rules";
    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  }

  function copyCompiled() {
    if (!compiledOutput || !compiledOutput.ok) return;

    navigator.clipboard.writeText(compiledOutput.output);
  }
</script>

<div id="toolbar">
  <!-- File Management -->
  <div class="toolbar-group">
    <input
      type="file"
      bind:this={fileInputElement}
      style="display:none"
      on:change={loadLocalFile}
    />
    <button on:click={() => fileInputElement.click()}>Load File</button>

    <select bind:value={selectedTemplate} on:change={loadTemplate}>
      <option value="" disabled selected hidden>Load Template</option>
      <option value="grass">Grass</option>
      <option value="generic">Generic</option>
      <option value="freeze">Freeze</option>
    </select>
  </div>

  <!-- Tileset -->
  <div class="toolbar-group">
    <input
      type="file"
      bind:this={tilesetInputElement}
      style="display:none"
      on:change={loadTileset}
    />
    <button on:click={() => tilesetInputElement.click()}>Load Tileset</button>
  </div>

  <!-- Compile -->
  <div class="toolbar-group compile-group">
    <select bind:value={compilerVersion}>
      <option value="0.5.1">v0.5.1</option>
      <option selected value="0.6.0">v0.6.0 (latest)</option>
    </select>

    <button on:click={compile}>Compile</button>
    <button
      on:click={downloadCompiled}
      class:disabled={!compiledOutput || !compiledOutput.ok}>Download</button
    >
    <button
      on:click={copyCompiled}
      class:disabled={!compiledOutput || !compiledOutput.ok}>Copy</button
    >
  </div>
</div>

<style>
  #toolbar {
    display: flex;
    padding: 0.5rem;
    background-color: var(--panel);
    border-bottom: 1px solid var(--border);
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .toolbar-group {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .compile-group {
    margin-left: auto;
  }

  #toolbar button,
  #toolbar select {
    background: var(--button-bg);
    border: none;
    color: var(--text);
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    font-size: 0.9rem;
  }

  #toolbar button:hover,
  #toolbar select:hover {
    background: var(--button-hover);
  }

  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
