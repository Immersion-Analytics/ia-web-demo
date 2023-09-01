
import IA from 'ia-visualizer'
import { BarChartCode, NetworkGraphCode, PortfolioManagementCode, SurfacePlotCode, TimeseriesDataTubesCode } from './viz-files';

export interface DemoInfo {
    name: string;
    description?: string;
    code: string
}

export function getDemos(): DemoInfo[] {
    return [
        {
            name: "Portfolio Management",
            description: "Description HTML for the portfolio demo",
            code: PortfolioManagementCode
        },
        {
            name: "Network Graph",
            description: "Description HTML for the Network Graph and Cybersecurity demo",
            code: NetworkGraphCode
        },
        {
            name: "Timeseries DataTubes",
            description: "Description HTML for the Timeseries Datatubes demo",
            code: TimeseriesDataTubesCode
        },
        {
            name: "Bar Chart",
            description: "Description HTML for the Bar Chart demo",
            code: BarChartCode
        },
        {
            name: "Surface",
            description: "Description HTML for the Surface demo",
            code: SurfacePlotCode
        }   
    ]

}