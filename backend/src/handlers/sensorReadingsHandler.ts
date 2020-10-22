
import { SensorReadingInterface } from "../types/sensorReadingsType"
import { findAll } from "../models/sensorReadingModel"

const sensorReadingsHandler = (req: any, res: any) => {
    const readings: SensorReadingInterface[] = findAll();
    if (!readings) {
        res
            .status(400)
            .send("Oh uh, something went wrong");
    }
    res
        .status(200)
        .send(readings);
}

export default sensorReadingsHandler;