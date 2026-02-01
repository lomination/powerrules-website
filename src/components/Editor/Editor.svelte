<script lang="ts">
  import { onMount } from "svelte";
  import * as monaco from "monaco-editor";
  import { createEditor } from "../../lib/editor/editor";

  export let editorContent: string;

  let editorDiv: HTMLDivElement;
  let editor: monaco.editor.IStandaloneCodeEditor;

  onMount(() => {
    editor = createEditor(editorDiv);

    editor.onDidChangeModelContent(() => {
      editorContent = editor.getValue();
    });
  });

  $: if (editor && editor.getValue() !== editorContent) {
    const model = editor.getModel();
    if (!model) throw new Error("Could not get Monaco Editor main model.");

    editor.executeEdits("programmatic", [
      {
        range: model.getFullModelRange(),
        text: editorContent,
        forceMoveMarkers: true,
      },
    ]);
  }
</script>

<div id="editor" bind:this={editorDiv}></div>

<style>
  #editor {
    flex: 1;
    height: 100%;
    width: 100%;
    border: 2px solid var(--border);
  }
</style>
