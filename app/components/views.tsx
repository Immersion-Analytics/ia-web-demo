import { ArrowsDownUp, ArrowsOutCardinal } from "@phosphor-icons/react";
import { MdOutlineAdsClick } from "react-icons/md";

export function Instructions() {
    return <div className="instructions p-5">
        <h2 className="border-b border-neutral-500">Instructions</h2>

        <p><ArrowsOutCardinal className="inline-icon"/> <b>Drag mouse</b> to orbit around the visualization</p>

        <p><ArrowsOutCardinal className="inline-icon"/> Hold the <b>Alt/Option key</b> and drag to move the camera</p>

        <p><ArrowsDownUp className="inline-icon"/> <b>Scroll</b> to zoom in and out</p>

        <p><MdOutlineAdsClick className="inline-icon"/> <b>Click</b> to select a point and see more information about it</p>

        <p><MdOutlineAdsClick className="inline-icon"/> <MdOutlineAdsClick className="inline-icon"/> <b>Double click</b> a point to center on it</p>
    </div>
}