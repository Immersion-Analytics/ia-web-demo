'use client'
import IA from 'ia-visualizer'

export function getVizDemoCode(name:string) {
    return `
let url = "https://immersionanalytics.ai/viz/demo-data/";
url += "${name}";
IA.loadDocument(url);
`;
}

export const PortfolioManagementCode = getVizDemoCode("1. Portfolio Management.viz")

export const NetworkGraphCode = getVizDemoCode("2. Network (Cybersecurity).viz")

export const TimeseriesDataTubesCode = getVizDemoCode("4. Timeseries DataTubes.viz")

export const BarChartCode = getVizDemoCode("5. Dimensional Bar Chart.viz")

export const SurfacePlotCode = getVizDemoCode("6. Surface Plot (w Opacity).viz")