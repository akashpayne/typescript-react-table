import app from "./app";

const port = app.get("port")
const domain = process.env.DOMAIN || "http://localhost";

const server = app.listen(port, () => {
    console.info(`The server is listening on ${domain}:${port}`)
    console.warn("  Press CTRL-C to stop\n");
});

export default server;