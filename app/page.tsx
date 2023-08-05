"use client";

import Visualizer from "../visualizer/visualizer"
import Header from "./components/header"
import Footer from "./components/footer"
import { DemoInfo, getDemos } from "@/visualizer/demos"
import { IAButton } from "./components/buttons"
import { useState, useContext, createContext, useRef, useEffect } from "react"
import Sidebar from "./components/sidebar";
import { Instructions } from "./components/views";
import { CodeEditor, CodeEditorRef } from "./components/code-editor";
import IA from 'ia-visualizer'

const LeftSidebarTabs = [
  {
    name: "Instructions",
    content: <Instructions />,
  },
]

// const CodeContext = createContext<string | null>(null)


export default function Home() {
  const demos = getDemos();
  const [selectedDemo, setSelectedDemo] = useState<null | DemoInfo>(null);
  const [initialized, setInitialized] = useState(false);
  // const [code, setCode] = useState("");
  const codeEditorRef = useRef<CodeEditorRef>(null);
  
  function playCode(code:string | null) {
      console.log("Play code:", code)

      if (code)
      {
          // Ensure code is not evaluated until Visualizer is ready
          IA.onReady(() => eval(code));
      }
  }


  const rightSidebarTabs = [
    {
      name: "Javascript Code",
      content: <CodeEditor ref={codeEditorRef}
                           onPlay={playCode}
                           initialCode={selectedDemo?.code}
                           />,
      cssClassName: "bg-neutral-900/95",
    },
    {
      name: "Legend",
      content: <div>Legend test</div>,
    },
  ]


  function selectDemo(demo: DemoInfo) {
    if (demo?.name == selectedDemo?.name)
      return
    console.log("Selecting demo:", demo)
    setSelectedDemo(demo);
    codeEditorRef.current?.setCode(demo?.code);
    playCode(demo?.code);
  }

  // Select initial demo
  useEffect(() => {
    selectDemo(demos[1])
    setInitialized(true)
  }, [initialized])
    

  return (
  <div className="flex flex-col">
    <div className="flex flex-col flex-grow h-screen gap-0 text-stone-400">
      <Header />
      <div className="relative flex flex-row gap-0 flex-grow min-h-[300px]">
        <Sidebar id="left-sidebar"
                initialWidth={300} minWidth={100}
                tabs={LeftSidebarTabs}
                selected={LeftSidebarTabs[0]}
                side="left"
                />
        <main className="flex-grow h-full bg-black shadow-2xl">
          <Visualizer
                className="flex-1 overflow-hidden w-full h-full"
                demo={selectedDemo}
                />
        </main>
        <Sidebar id="right-sidebar"
                initialWidth={400} minWidth={100}
                tabs={rightSidebarTabs}
                selected={null}
                side="right"
                />
      </div>
      <div className="demo-selector page-section z-50 flex justify-center w-full">
        {/* Outer and inner container to handle scrolling overflow without clipping left edge
        on narrow screens */}
        <div className="p-10 flex flex-row gap-5 w-fit max-w-full overflow-x-scroll">
          { getDemos().map(demo => {
            return <DemoTile 
                      key={demo.name}
                      demo={demo}
                      onSelected={() => selectDemo(demo)}
                      className={"mx-auto" + (demo.name === selectedDemo?.name ? " active" : "")} />
          })}
        </div>
      </div>
    </div>
    <Footer />
  </div>)
}

interface DemoTileProps {
  demo: DemoInfo
  onSelected: () => void
  className?: string
}

function DemoTile({demo, className, onSelected}:DemoTileProps) {
  return (
    <IAButton onClick={onSelected}>
      <div className={className + " demo-tile hover-btn"}>
        {/* <div className=""> */}
          <div className="mx-auto">{demo.name}</div>
          {/* <p className="text-gray-400">{props.description}</p> */}
        {/* </div> */}
      </div>
    </IAButton>
  )
}
