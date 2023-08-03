
const LOCAL_DEBUG = true;

const BASE_URL = LOCAL_DEBUG ? "http://webgltest.immersionanalytics.com:8080/" : "https://immersionanalytics.ai/viz/latest/"

interface IAScriptImportsProps {
    onReady?: () => void
}

export const IARuntimeURL = BASE_URL + "scripts/ia.runtime.js"
export const IAVisualizerURL = BASE_URL + "scripts/ia.visualizer.js"