import React from "react";
import SensorReadingInterface from "../../types/sensorReadingType";

const sensorReadings = ({ readings, loading }:any) => {
    if (loading) {
        return <h2>loading...</h2>
    }

    return <ul className="list-group mb-4">
        {readings.map(
            (reading: SensorReadingInterface) =>(
                <li key={reading.id} className="list-group-item">
                    {JSON.stringify(reading)}
                </li>
            )
        )}
    </ul>
}

export default sensorReadings;