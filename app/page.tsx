"use client";

import { ArrowsDownUp, ArrowsOutCardinal } from "@phosphor-icons/react"
import { MdOutlineAdsClick } from "react-icons/md"
import Visualizer from "../visualizer/visualizer"
import ResizablePanel from "./components/ResizablePanel"
import Header from "./components/header"
import Footer from "./components/footer"
import { DemoInfo, getDemos } from "@/visualizer/demos"
import { IAButton } from "./components/buttons"
import { useState } from "react"
import Sidebar from "./components/sidebar";
import { Instructions } from "./components/views";

const SidebarTabs = [
  {
    name: "Instructions",
    content: () => <Instructions />,
  },
  {
    name: "Test",
    content: () => <div>Test tab content</div>,
  }
]

export default function Home() {
  const demos = getDemos();
  const [selectedDemo, setSelectedDemo] = useState<null | DemoInfo>(demos[1]);

  return (
  <div className="flex flex-col">
    <div className="flex flex-col flex-grow h-screen gap-0 text-stone-400">
      <Header />
      <div className="relative flex flex-row gap-0 flex-grow min-h-[300px]">
        <Sidebar tabs={SidebarTabs} side="left" />
        <main className="flex-grow h-full bg-black shadow-2xl">
          <Visualizer
                className="flex-1 overflow-hidden w-full h-full"
                demo={selectedDemo}
                />
        </main>
        {/* <ResizablePanel width={200} minWidth={100} handleLeft={true} className="sidebar">
            <h2>Selection details</h2>
        </ResizablePanel> */}
      </div>
      <div className="demo-selector page-section z-50 flex justify-center w-full">
        {/* Outer and inner container to handle scrolling overflow without clipping left edge
        on narrow screens */}
        <div className="p-10 flex flex-row gap-5 w-fit max-w-full overflow-x-scroll">
          { getDemos().map(demo => {
            return <DemoTile 
                      key={demo.name}
                      demo={demo}
                      onSelected={() => setSelectedDemo(demo)}
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
