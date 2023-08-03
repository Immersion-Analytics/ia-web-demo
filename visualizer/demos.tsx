
import IA from 'ia-visualizer'
import { playDataTubes, playNetworkGraph, playPortfolioManagement, playSurfaceViz } from "./viz-files";

export interface DemoInfo {
    name: string;
    description?: string;
    play: (ia:IA) => void;
}

export function getDemos(): DemoInfo[] {
    return [
        {
            name: "Portfolio Management",
            play: playPortfolioManagement
        },
        {
            name: "Network Graph",
            play: playNetworkGraph
        },
        {
            name: "Timeseries DataTubes",
            play: playDataTubes
        },
        {
            name: "Surface",
            play: playSurfaceViz
        }   
    ]

}