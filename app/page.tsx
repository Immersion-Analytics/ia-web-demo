"use client";

import Visualizer from "../visualizer/visualizer"
import Header from "./components/header"
import Footer from "./components/footer"
import { DemoInfo, getDemos } from "@/visualizer/demos"
import { IAButton } from "./components/buttons"
import {useState, useContext, createContext, useRef, useEffect, useCallback} from "react"
import Sidebar from "./components/sidebar";
import { Instructions } from "./components/views";
import { CodeEditor, CodeEditorRef } from "./components/code-editor";
import IA from 'ia-visualizer'
import {useTheme} from "next-themes";

const LeftSidebarTabs = [
  {
    name: "Instructions",
    content: <Instructions />,
  },
]

// const CodeContext = createContext<string | null>(null)

function setIABackgroundColor(lightMode:boolean) {
  const color = lightMode ? 'rgb(249, 249, 249)' : 'rgb(80, 80, 80)';
  IA.onReady(() => IA.setBackgroundColor(lightMode, color));
}

export default function Home() {
  const [demos, _] = useState(getDemos());
  const [selectedDemo, setSelectedDemo] = useState<null | DemoInfo>(null);
  const [iaReady, setIAReady] = useState(false);
  // const [code, setCode] = useState("");
  const codeEditorRef = useRef<CodeEditorRef>(null);
  const { theme, setTheme:_setTheme } = useTheme();

  // Note, theme is returning undefined on the server at page load time, but value is set properly on the client
  // the undefined check is a workaround
  const lightMode = theme === 'light';// || theme === undefined;

  const playCode = useCallback((code:string | null) => {
      console.log("Play code:", code)

      if (code)
      {
          // Ensure code is not evaluated until Visualizer is ready
          IA.onReady(() => eval(code));
      }
  }, [])

  const setTheme = useCallback((theme:string) => {
    _setTheme(theme);
  }, []);


  const rightSidebarTabs = [
    {
      name: "Javascript Code",
      content: <CodeEditor ref={codeEditorRef}
                           onPlay={playCode}
                           initialCode={selectedDemo?.code}
                           />,
      cssClassName: "bg-inset/20",
    },
    {
      name: "Legend",
      content: <div>Legend test</div>,
    },
  ]


  const selectDemo = useCallback((demo: DemoInfo) => {
    if (demo?.name == selectedDemo?.name)
      return
    console.log("Selecting demo:", demo)
    setSelectedDemo(demo);
    codeEditorRef.current?.setCode(demo?.code);
    playCode(demo?.code);

  }, [selectedDemo?.name]);

  // Set initial parameters
  useEffect(() => {
    selectDemo(demos[1])
    // setInitialized(true)
    IA.onReady(() => { setIAReady(true); });
  }, [])

  // Update IA background color when theme changes
  useEffect(() => {
    setIABackgroundColor(lightMode);
  }, [lightMode])

  return (
  <div className={"flex flex-col"}>
    <div className="flex flex-col flex-grow gap-0">
      <Header lightMode={lightMode} setLightMode={enabled => setTheme(enabled ? "light" : "dark")} />
      <div className="m-12">
        <h2 className="text-2xl">Lorem ipsum dolor sit amet</h2>
        <p className="my-2">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h2 className="mt-12 text-2xl text-right">Sed ut perspiciatis unde</h2>
        <p className="my-2">
          omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
          eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>

      </div>
      <div className="relative flex flex-row gap-0 page-section flex-grow min-h-[300px] h-[60vh] border-y border-fg/20">
        {/*<Sidebar id="left-sidebar"
                initialWidth={300} minWidth={100}
                tabs={LeftSidebarTabs}
                selected={LeftSidebarTabs[0]}
                side="left"
                />
                */}
        <Instructions className="w-1/3 border-r border-fg/20" />
        <main className="flex-grow h-full">
          <Visualizer
                className="flex-1 overflow-hidden w-full h-full"
                demo={selectedDemo}
                />
        </main>
        {/*<Sidebar id="right-sidebar"
                initialWidth={400} minWidth={100}
                tabs={rightSidebarTabs}
                selected={null}
                side="right"
                />
                */}
      </div>
      <div className="my-0 mx-0 py-6 px-12">
        <h3 className="mb-4">Demo Description</h3>
        {selectedDemo?.description}
      </div>
      <div className="demo-selector page-section z-50 flex justify-center w-full">
        {/* Outer and inner container to handle scrolling overflow without clipping left edge
        on narrow screens */}
        <div className={"p-10 flex flex-row gap-5 w-fit max-w-full overflow-x-scroll " + (iaReady ? "" : "disabled")}>
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
