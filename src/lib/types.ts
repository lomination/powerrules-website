export type CompileResult =
    | { ok: true; output: string }
    | { ok: false; error: string };
