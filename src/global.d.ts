/// <reference types="svelte" />

declare module "*.svelte" {
  import { SvelteComponentTyped } from "svelte";
  export default SvelteComponentTyped<any, any, any>;
}

declare module "*?raw" {
  const content: string;
  export default content;
}
