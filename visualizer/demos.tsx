
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
            code: PortfolioManagementCode
        },
        {
            name: "Network Graph",
            code: NetworkGraphCode
        },
        {
            name: "Timeseries DataTubes",
            code: TimeseriesDataTubesCode
        },
        {
            name: "Bar Chart",
            code: BarChartCode
        },
        {
            name: "Surface",
            code: SurfacePlotCode
        }   
    ]

}