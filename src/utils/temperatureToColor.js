import hslToHex from "./hslToHex";

export default function temperatureToColor(temperature) {
    
    //maps temperature values between 2200 - 6200 to colors between orange - white - blue (4000 = white)
    let hsl = { h: '', s: '', l:'' };
    if (temperature <= 4000) {
        let l = (temperature - 2200) / (4000 - 2200) * 50 + 50;
        hsl.h = '50'; hsl.s = '100'; hsl.l = `${l}`
    } else {
        let l = (6200 - temperature) / (6200 - 4000) * 50 + 50;
        hsl.h = '200'; hsl.s = '100'; hsl.l = `${l}`
    }

    return hslToHex(hsl);

}