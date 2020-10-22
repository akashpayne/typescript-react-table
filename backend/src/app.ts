import express from "express";
import cors from "cors";
import rootHandler from "./handlers/rootHandler";
import sensorReadingsHandler from "./handlers/sensorReadingsHandler";
// import { loggers } from "winston";

// create express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 5000);

// middleware
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// session
// passport
//

// route handlers or controllers
app.get("/", rootHandler);
app.get("/api/sensor", sensorReadingsHandler);

// const headers = {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Credentials': true,
// };

export default app;