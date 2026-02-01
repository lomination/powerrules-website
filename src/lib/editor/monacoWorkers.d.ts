/// <reference types="vite/client" />

declare module "monaco-editor/esm/vs/editor/editor.worker?worker" {
  class EditorWorker extends Worker {
    constructor();
  }
  export default EditorWorker;
}

declare module "monaco-editor/esm/vs/language/json/json.worker?worker" {
  class JSONWorker extends Worker {
    constructor();
  }
  export default JSONWorker;
}

declare module "monaco-editor/esm/vs/language/css/css.worker?worker" {
  class CSSWorker extends Worker {
    constructor();
  }
  export default CSSWorker;
}

declare module "monaco-editor/esm/vs/language/html/html.worker?worker" {
  class HTMLWorker extends Worker {
    constructor();
  }
  export default HTMLWorker;
}

declare module "monaco-editor/esm/vs/language/typescript/ts.worker?worker" {
  class TSWorker extends Worker {
    constructor();
  }
  export default TSWorker;
}
