
'use client'
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { MdPlayCircle } from 'react-icons/md'
import { forwardRef, useImperativeHandle, useState } from 'react'

interface CodeEditorProps {
    className?: string
    initialCode?: string
    onPlay: (code: string | null) => void
}

export interface CodeEditorRef {
    setCode: (code: string) => void
}

export const CodeEditor = forwardRef<CodeEditorRef, CodeEditorProps>((p:CodeEditorProps, ref) => {
    const [code, setCode] = useState(p.initialCode)

    useImperativeHandle(ref, () => ({
        setCode
    }))


    function onEditorChanged(newCode:string) {
        setCode(newCode);
    }


    console.log("initializing code editor with code:", code)

    return (
    <div className={p.className + " "}>
        <div className="m-2 mb-0 flex flex-row gap-2 items-center justify-between">
            <div>Demo Javascript Editor</div>
            <MdPlayCircle onClick={() => p.onPlay(code ?? "")} size={30} className="hover-btn text-green-600"/>
        </div>
        <CodeMirror
            height="800px"

            value={code ?? ""}
            extensions={[javascript({ jsx: true })]}
            theme={vscodeDark}
            editable={true}
            onChange={onEditorChanged}
            style={{
                boxShadow: "0px 0px 20px rgba(0,0,0, .5)",
            }}
            />
    </div>
    )
})