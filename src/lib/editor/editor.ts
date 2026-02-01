import * as monaco from "monaco-editor";
import { registerPowerRulesLanguage } from "./language";

import "./monacoWorkers"

export const defaultValue: string = `\
::config::

parsing.indentation = 4
parsing.usetabs = no
writing.temporarytile = 0xff+2
writing.spacing = least
writing.verbose = more

::macros::

def reset(tile)
    replace
        with <tile>
        if there is full
end

::rules::

[Rule]

$reset(0x1+0)

[Other]

shadow
    with
        0x1+0 0x14+1 0x24+1 0x75+1 0x76+2 0x52+0
    withinternal
        0x35+2 0x85+2 0xb0+1 0xb1+3 0xb2 0xb3+1 0x60+1 0xb4+0
    if there is full
    mode normal
`
// `/*
//  * Welcome to the PowerRules editor.
//  *
//  * Check out the tutorials available from the wiki page.
//  *
//  * Load the tileset you would like to work on.
//  * You can also load a template depending on your needs to provide a general structure.
//  */
// `

export function createEditor(editorContainer: HTMLDivElement): monaco.editor.IStandaloneCodeEditor {
  registerPowerRulesLanguage();

  let editor = monaco.editor.create(editorContainer, {
    // value: defaultValue,
    language: "powerrules",
    theme: "powerrules-dark",
    automaticLayout: true,

    // tabSize: 4,
    // insertSpaces: true,
    // detectIndentation: false
  });

  editor.getModel()?.updateOptions({
    tabSize: 4,
    insertSpaces: true,
  });


  return editor;
}
