export default function getPercentage(min, max, value) {

    max -= min;
    value -= min;
    return value/max * 100;

}
