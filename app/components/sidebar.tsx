import { CSSProperties, useState } from "react";
import ResizablePanel from "./ResizablePanel";
import { motion, AnimatePresence } from "framer-motion";



interface SidebarTab {
    name: string;
    content: JSX.Element;
    cssClassName?: string;
}

interface SidebarProps {
    id: string
    tabs: SidebarTab[]
    selected: SidebarTab | null
    side: 'left' | 'right'
    className?: string
    initialWidth: number
    minWidth: number
}

export default function Sidebar({ className, id, tabs, selected, side, initialWidth, minWidth }: SidebarProps) {
    const [width, setWidth] = useState(initialWidth);

    const [openTab, setOpenTab] = useState<SidebarTab | null>(selected);

    function selectTab(tab: SidebarTab) {
        // if clicked on the currently open tab, close it
        setOpenTab(tab == openTab ? null : tab);
    }

    const isLeft = side === 'left';
    const slideInPosition = isLeft ? -100 : 100;
    const positionClass = isLeft ? ' left-0' : ' right-0';
    // const buttonBorderClass = '  ';
    const panelBorderClass = isLeft ? ' border-r rounded-br-2xl pl-7' : ' border-l rounded-bl-2xl pr-7';
    const panelClass = ' ' + (openTab?.cssClassName ?? 'bg-neutral-950/95')

    const navCSS:CSSProperties = {
        'writingMode': 'vertical-lr',
        // 'transform': ''
    }

    if (isLeft)
        navCSS['transform'] = 'rotate(180deg)'

    return (
        <div className={"sidebar absolute z-40 " + positionClass + " " + (className ?? '')}>
            {/* Tabs */}
            <div className={"z-50 space-y-1 flex flex-row-reverse gap-0.5 py-10 absolute top-0 " + positionClass}  style={navCSS}>
                {
                tabs.map(tab => {
                    const isActive = tab.name === openTab?.name
                    const bgCss = isActive ? ' bg-neutral-800/95 text-neutral-100 ' : ' bg-neutral-900/95 text-neutral-200 '
                    return (
                        <button
                            key={tab.name}
                            className={
                                "hover-btn whitespace-nowrap pr-0.5 py-5" +
                                " border-white/20 shadow-md" +
                                " border-l rounded-l-lg" +
                                bgCss +
                                (isActive ? ' active' : '')
                            }
                            onClick={() => selectTab(tab)}
                        >
                            {tab.name}
                        </button>
                    )
                })
                }
            </div>

            {/* Content */}
            <AnimatePresence>
            { openTab && (
                    <motion.div 
                        key={id}
                        initial={{ x: slideInPosition, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: slideInPosition, opacity: 0 }}
                        transition={{ duration: .25, ease: "easeInOut" }}
                        style={{
                            // position: "relative",
                        }}
                        // exit={{ x: "-100vh", opacity: 0 }}
                    >
                        <ResizablePanel
                                initialWidth={width} minWidth={minWidth}
                                onWidthChanged={setWidth}
                                handleLeft={side == 'right'}
                                handleRight={side == 'left'}
                                className={"pt-10 z-20 absolute left-0 border-r border-white/10 overflow-clip" + 
                                    " shadow-[0_0_10px_rgba(0,0,0,1.0)]" +
                                    panelBorderClass + positionClass + panelClass}>
                            { openTab?.content }
                        </ResizablePanel>
                    </motion.div>
            )
            }
            </AnimatePresence>

        </div>
    )
}