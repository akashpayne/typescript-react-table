export interface SensorReadingInterface {
    "id": string;
    "box_id": string;
    "sensor_type": string;
    "name": string;
    "range_l": number;
    "range_u": number;
    "longitude": Float32Array;
    "latitude": Float32Array;
    "reading": number;
    "unit": string;
    "reading_ts": string;
}