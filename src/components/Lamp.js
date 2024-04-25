import React from "react"
import hexToRgb from "../utils/hexToRgb.js";

export default function Lamp({ intensity, color }){

    const rgbColor = hexToRgb(color).rgb;

    let light_style = {
        'background': `linear-gradient(to bottom, ${rgbColor} 0%, #00000000 ${intensity}%)`
    };

    let light_container_style = {
        filter: `drop-shadow(0px 0px 100px ${rgbColor})`
    };

    return(
        <div className="lamp">
            <div className="lamp-item lamp-top"></div>
            <div className="lamp-item lamp-middle"></div>
            <div className="lamp-item lamp-bottom"></div>
            <div className="lamp-item light--container" style={ light_container_style }>
                <div className="lamp-item light" style={ light_style } />
            </div>
        </div>
    )
}