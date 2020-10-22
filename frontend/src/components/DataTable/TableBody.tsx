import React from "react";
import SensorReadingInterface from "../../types/sensorReadingType";

const TableBody = (props: {data: SensorReadingInterface[]}) => {

    if (!Array.isArray(props.data)) {
        return (
            <tbody>
                <tr>
                    Error on Table Body
                </tr>
            </tbody>
        )
    }

    return (
        <tbody>
            {props.data.map((item: SensorReadingInterface) => {
                return (
                    <tr key={`${item.id}-${item.box_id}-${item.reading_ts}`}>
                        <th >
                            {item.id}
                        </th>
                        <td>
                            {item.box_id}
                        </td>
                        <td>
                            {item.sensor_type}
                        </td>
                        <td>
                            {item.name}
                        </td>
                        <td>
                            {item.range_l}
                        </td>
                        <td>
                            {item.range_u}
                        </td>
                        <td>
                            {item.longitude}
                        </td>
                        <td>
                            {item.latitude}
                        </td>
                        <td>
                            {item.reading}
                        </td>
                        <td>
                            {item.unit}
                        </td>
                        <td>
                            {new Date(item.reading_ts).toDateString()}
                        </td>
                    </tr>
                )
            })}
        </tbody>
    )
}

export default TableBody;