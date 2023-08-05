
'use client'
import IA from 'ia-visualizer'
import { useEffect, useState } from 'react'
import { DemoInfo } from './demos'

interface Props {
    className?: string
    // onReady?: () => void
    demo: DemoInfo | null
}

export default function Visualizer({className, demo}: Props) {
    console.log("VisualizerComponent()")
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const element = document.querySelector("#ia-visualizer")
        if (!element)
        {
            console.log("VisualizerComponent.useEffect(): element not found");
            return
        }

        // Only init on first pass
        if (!initialized)
        {
            console.log("Initializing IA");
            IA.init(element);
            setInitialized(true)
        }
    })

    return <>
        <div className={className + " "} id="ia-visualizer" />
    </>
}