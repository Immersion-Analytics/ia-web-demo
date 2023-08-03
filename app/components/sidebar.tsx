import { useState } from "react";
import ResizablePanel from "./ResizablePanel";

interface SidebarTab {
    name: string;
    content: () => JSX.Element;
}

interface SidebarProps {
    tabs: SidebarTab[];
    side: 'left' | 'right';
}

export default function Sidebar({ tabs, side }: SidebarProps) {
    const [openTab, setOpenTab] = useState<SidebarTab | null>(null);

    function selectTab(tab: SidebarTab) {
        // if clicked on the currently open tab, close it
        setOpenTab(tab == openTab ? null : tab);
    }

    return (
        <div className="sidebar">
            {/* Tabs */}
            <div className="space-y-1 flex flex-row-reverse gap-0.5 py-4 absolute top-0 left-0 z-10"  style={{'writingMode': 'vertical-lr', 'transform': 'rotate(180deg)'}}>
                {
                tabs.map(tab => {
                    return (
                        <button
                            key={tab.name}
                            className={"hover-btn border-l border-white/20 bg-white/10 text-neutral-100 rounded-l-lg py-2 shadow-md " +
                                (tab.name === openTab?.name && 'active bg-white/20')}
                            onClick={() => selectTab(tab)}
                        >
                            {tab.name}
                        </button>
                    )
                })
                }
            </div>
            {/* Content */}
            { openTab && <>
                <animated.div style={animationStyles}>
                    <ResizablePanel width={200} minWidth={100} handleRight={true} className="p-5 pl-10">
                        { openTab?.content() }
                    </ResizablePanel>
                </animated.div>
            </>}

        </div>
    )
}