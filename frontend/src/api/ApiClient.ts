import axios, { AxiosResponse } from "axios";
import { SensorReadingInterface } from "../types/sensorReadingType";
import { env } from "../services/Env";
const apiUrl = env.api.URL || "https://localhost:5000";
const defaultApiUrl = `${apiUrl}/api/sensor/`;


const headers = {
    // should have auth on api, but as this is only for local use we won't
    // "Authorization": Env.secret,
    "Content-Type": "application/json",
    "cache-control": "no-cache",
    "Access-Control-Allow-Origin": "true"
};

const getSensorReadings = async (apiUrl:string):Promise<SensorReadingInterface[]> => {
    const apiRoute = apiUrl || defaultApiUrl;
    let data: SensorReadingInterface[] = [];
    try {
        console.log("sensorReadingUrl", apiUrl, apiRoute);
        data = await axios
            .get(
                apiRoute,
                { headers: headers }
            )
            .then((response: AxiosResponse) => {
                return response.data;
            })
    } catch (error) {
        console.error("Error on get Readings: ",error);
    }
    return data;
}

// const apiClient = ( ) => { }

export default getSensorReadings;