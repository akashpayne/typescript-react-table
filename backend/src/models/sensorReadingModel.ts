import fs from "fs";
import { SensorReadingInterface } from "../types/sensorReadingsType"

const dataFile = "../data/sensor_readings.json";

export const findAll = (): SensorReadingInterface[] => {
    let readings: SensorReadingInterface[] = [];
    // read raw file
    const rawData = fs.readFileSync(dataFile, "utf8");
    // trim data
    const validJSON = '[' + rawData.replace(/\n+(?=\{)/g, ',\n') + ']';
    // parse the encoded data
    readings = JSON.parse(validJSON);
    return readings;
}

// ready for more details request, i.e. with params to process data.
// tslint:disable-next-line: no-empty
const sensorReadingModel = () => {}

export default sensorReadingModel