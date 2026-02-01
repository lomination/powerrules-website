<script lang="ts">
  import { tick } from "svelte";

  export async function appendToConsole(...args: any[]): Promise<void> {
    consoleContent += args.map((a) => String(a)).join(" ") + "\n";
    await tick();
    consoleElement.scrollTop = consoleElement.scrollHeight;
  }

  export function clearConsole(): void {
    consoleContent = "";
  }

  let consoleElement: HTMLTextAreaElement;
  let consoleContent: string = "";
</script>

<textarea id="console" bind:this={consoleElement} bind:value={consoleContent}>
</textarea>

<style>
  #console {
    font-family: monospace;
    background-color: var(--panel);
    color: whitesmoke;
    overflow: scroll;
    overflow-y: auto;
    overflow-x: auto;
    height: 20%;
  }
</style>
