import React from "react";
import temperatureToColor from "../utils/temperatureToColor.js";

export default function ControlMenu( {intensity, setIntensity, color, setColor} ){

    const [colorOption, setColorOption] = React.useState(''); 
    const temperature_Ref = React.useRef(2200);
    const color_Ref = React.useRef('#ffffff');

    React.useEffect(() => {

    }, [])

    const onIntensityChange = (e) => {
        setIntensity(e.target.value);
    }

    const onColorOptionChange = (e) => {
        setColorOption(e.target.id);
        if(e.target.id === 'temperature') {
            setColor(
                temperatureToColor(temperature_Ref.current)
            );
        } else if (e.target.id === 'rgb') {
            setColor(color_Ref.current);
        }
    }

    const onTemperatureChange = (e) => {
        setColor(
            temperatureToColor(e.target.value)
        );
        temperature_Ref.current = e.target.value;
    }

    const onColorChange = (e) => {
        setColor(e.target.value);
        color_Ref.current = e.target.value;
    }

    return(
        <div className="control_menu">
            <div style={{paddingBottom: '25px'}} className="flex">
                <h3>Intensity</h3>
                <input className = "slider" type="range" min="10" max="100" name="intensity" value={intensity} onChange={onIntensityChange} />
            </div>

            <div style={{paddingBottom: '25px'}} className='choose_colormode'>
                <div className="flex">
                    <h3>Temparature</h3>
                    <input className = "slider" type="radio" name="coloring_choice" id="temperature" onChange={onColorOptionChange} />
                </div>
                <h3>OR</h3>
                <div className="flex">
                    <h3>RGB</h3>
                    <input className = "slider" type="radio" name="coloring_choice" id="rgb" onChange={onColorOptionChange}/>
                </div>
            </div>

            {
                (colorOption === 'temperature' &&
                    <input className = "slider" min={2200} max={6200} type="range" value={temperature_Ref.current} onChange={onTemperatureChange}/>
                )
                ||
                (colorOption === 'rgb' &&
                    <input style= {{ width: '100px', display: 'block', margin: '0 auto' }} type="color" value={color_Ref.current} onChange={onColorChange} />
                )
            }

        </div>
    )
}
