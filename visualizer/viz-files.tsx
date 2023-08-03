'use client'
import IA from 'ia-visualizer'

export function playIADemo(ia: IA, name:string) {
    let url = "https://immersionanalytics.ai/viz/demo-data/" + name
    IA.loadDocument(url)
}

export function playPortfolioManagement(ia:IA):void {
    playIADemo(ia, "1. Portfolio Management.viz")
}

export function playNetworkGraph(ia:IA):void {
    playIADemo(ia, "2. Network (Cybersecurity).viz")
}

export function playDataTubes(ia:IA):void {
    playIADemo(ia, "4. Timeseries DataTubes.viz")
}

export function playBarChart(ia:IA):void {
    playIADemo(ia, "5. Dimensional Bar Chart.viz")
}

export function playSurfaceViz(ia:IA):void {
    playIADemo(ia, "6. Surface Plot (w Opacity).viz")
}