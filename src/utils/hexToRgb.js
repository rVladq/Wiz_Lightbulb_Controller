export default function hexToRgb(hexValue) {

    const r = parseInt(hexValue.substring(1, 3), 16);
    const g = parseInt(hexValue.substring(3, 5), 16);
    const b = parseInt(hexValue.substring(5, 7), 16);

    return {
        r: r,
        g: g,
        b: b,
        rgb: `rgb(${r}, ${g}, ${b})`
    }

}