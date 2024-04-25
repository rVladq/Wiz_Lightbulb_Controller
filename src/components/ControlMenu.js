import React from "react";
import temperatureToColor from "../utils/temperatureToColor.js";
import IPBox from "./IPBox.js";
import getPercentage from "../utils/getPercentage.js";
import { invoke } from '@tauri-apps/api';

let settings;

export default function ControlMenu( {intensity, setIntensity, color, setColor} ){

    const [loading, setLoading] = React.useState(true);
    const loadingRef = React.useRef(true);

    const [ip, setIP] = React.useState('');
    const [colorOption, setColorOption] = React.useState(''); 
    const temperature_Ref = React.useRef(2200);
    const color_Ref = React.useRef('#ffffff');

    const sliderStyleBackgroundTemplate = (color1, color2, value) => {
        return { background: `linear-gradient(90deg, ${color1} ${value}%, ${color2} ${value}%)` }
    }

    const sliderBackgroundStyeRef = React.useRef({
        intensity: '',
        temperature: '',
    })

    //initialization
    React.useEffect( () => {
        if(loadingRef.current){ //default
            onIntensityChange({target: {value: 100}});
            onColorOptionChange({target: {id: 'temperature'}});
            onTemperatureChange({target: {value: temperature_Ref.current}})
            //get previous settings
            invoke('read_json', {filePath: '../settings.json'})
            .then((res) => {
                setLoading(false);
                loadingRef.current = false;
                settings = JSON.parse(res);
            })
            .catch((err) => {console.error(err); })
        } else {
            setIP(settings.ip)
            onIntensityChange({target: {value: settings.intensity}});
            if (settings.colorOption === 'temperature'){
                onColorOptionChange({target: {id: 'temperature'}});
                onTemperatureChange({target: {value: settings.temperature}})
            } else if (settings.colorOption === 'rgb') {
                onColorOptionChange({target: {id: 'rgb'}});
                onColorChange({target: {value: settings.color}})
            }
        }

    }, [loading])


    const onIntensityChange = (e) => {
        setIntensity(e.target.value);
        sliderBackgroundStyeRef.current = {
            ...sliderBackgroundStyeRef.current,
            intensity: getPercentage(10, 100, e.target.value)
        }
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
        
        sliderBackgroundStyeRef.current = {
            ...sliderBackgroundStyeRef.current,
            temperature: getPercentage(2200, 6200, e.target.value)
        }
    }

    const onColorChange = (e) => {
        setColor(e.target.value);
        color_Ref.current = e.target.value;
    }

    return(
        <div className="control_menu">
            <IPBox ip={ip} setIP={setIP} intensity={intensity} temperature={temperature_Ref.current} color={color_Ref.current} colorOption={colorOption}/>
            <div className="flex">
                <h3>Intensity</h3>
                <input className = "slider" style = { sliderStyleBackgroundTemplate('orange', 'white', sliderBackgroundStyeRef.current.intensity) } 
                type="range" min="10" max="100" name="intensity" value={intensity} onChange={onIntensityChange} />
            </div>

            <div className='choose_colormode'>
                <div className="flex">
                    <h3>Temparature</h3>
                    <input className = "slider" type="radio" name="coloring_choice" id="temperature" checked={colorOption === 'temperature'?true:false} onChange={onColorOptionChange} />
                </div>
                <h3>OR</h3>
                <div className="flex">
                    <h3>RGB</h3>
                    <input className = "slider" type="radio" name="coloring_choice" id="rgb" onChange={onColorOptionChange}/>
                </div>
            </div>

            {
                (colorOption === 'temperature' &&
                    <div className="flex">
                        <div className="tempCircle" style = { {backgroundColor: `${temperatureToColor(2200)}`} } />
                        <input className = "slider coloring_choice" style = { sliderStyleBackgroundTemplate(`${temperatureToColor(6200)}`, `${temperatureToColor(2200)}`, sliderBackgroundStyeRef.current.temperature) }
                        min={2200} max={6200} type="range" value={temperature_Ref.current} onChange={onTemperatureChange}/>
                        <div className="tempCircle" style = { {backgroundColor: `${temperatureToColor(6200)}`} } />
                    </div>
                )
                ||
                (colorOption === 'rgb' &&
                    <input className = "coloring_choice" style= {{ width: '100px', display: 'block', margin: '0 auto' }} type="color" value={color_Ref.current} onChange={onColorChange} />
                )
            }

        </div>
    )
}
