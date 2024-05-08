import {Extension} from "@tiptap/core";
import {JSTEditor, InnerEditor} from "../core/JSTEditor.ts";


export interface SaveExtOptions {
    onSave?: (e: JSTEditor) => boolean,
}

export const SaveExt = Extension.create<SaveExtOptions>({
    name: "saveExt",
    addKeyboardShortcuts() {
        return {
            'Mod-s': ({editor}) => {
                if (this.options.onSave) {
                    return this.options.onSave((editor as InnerEditor).JSTEditor)
                }
                return false;
            },
        }
    },
})
