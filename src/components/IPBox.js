import React from "react";
import hexToRgb from "../utils/hexToRgb"
import { invoke } from '@tauri-apps/api';

export default function IPBox( { ip, setIP, intensity, temperature, color, colorOption } ) {

    const [showInstructions, setShowInstructions] = React.useState(false);

    const onIpChange = (e) => {
        setIP(e.target.value);
    } 

    const handleSend = () => {

        const settings = {
            ip: ip,
            intensity: Number(intensity),
            colorOption: colorOption,
            temperature: Number(temperature),
            color: color,
        }

        invoke('write_json', {filePath: '../settings.json', data: JSON.stringify(settings)})
            .catch((err) => {console.error(err); })

        let lightSettings;

        if(colorOption === 'temperature') {
            let t = 2000;
            lightSettings = {
                id: 1,
                method: "setPilot",
                params: {
                    temp: Number(temperature),
                    dimming: Number(intensity)
                }
            }
        }
        else if (colorOption === 'rgb') {
            const rgb = hexToRgb(color);
            lightSettings = {
                id: 1,
                method: "setPilot",
                params: {
                    r: Number(rgb.r),
                    g: Number(rgb.g),
                    b: Number(rgb.b),
                    dimming: Number(intensity)
                }
            }
        }
            invoke('send_to_bulb', { ip: ip, message: JSON.stringify(lightSettings) })
                .catch((err) => console.log(err))
        }

    return (
        <div className = "ip--wrapper">
            <div className="instructionsButton" onClick={() => setShowInstructions((prev) => !prev)}> 
                <h1>i</h1>
            </div>
            { showInstructions && <div className="instructions">
                <ul>
                    <li>Open the Wiz App on your phone/tablet.</li>
                    <li>Open the side menu and go to 'Lights'.</li>
                    <li>Select your lightbulb, then click on 'Model'.</li>
                    <li>You should be looking at a list of details now.</li>
                    <li>Write the IP in the text box above.</li>
                </ul>
            </div>}
            <input className="ipBox" type="text" name="myText" value={ ip } placeholder="192.168.X.XYZ"
            onChange={ onIpChange } />
            <div className="btnSendCommand" onClick={ handleSend }>
                <h3>SEND</h3> 
            </div>
        </div>
    )

}