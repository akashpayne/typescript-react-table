import request from "supertest";
import app from "../src/app";

const sizeOfData = 8240;
const sensorReadingPath = "/api/sensor"

describe("Sensor Readings Handler",() => {

    describe("handles bad response from api", () => {
        beforeAll(() => {
            process.env.NODE_ENV = "test";
        });

        afterAll((done: jest.DoneCallback) => {
            done();
        });

        it("returns a 404 from the handler if the path is not found", async ()=>{
            const res = await request(app)
                .post("/not_a_valid_path")
                .expect(404);
        });

    });

    describe("processes sensor readings from the data file",() => {
        beforeAll(() => {
            process.env.NODE_ENV = "test";
        });

        afterAll((done: jest.DoneCallback) => {
            done();
        });

        it("returns a 200 from the handler if path is found", async () => {
            const res = await request(app)
                .get(sensorReadingPath)
                .expect(200);
            console.log(res);
        })
        it("returns correct content type from the handler if path is found", async () => {
            const res = await request(app)
                .get(sensorReadingPath)
                .expect(200)
                .expect("Content-Type",/json/);
        })
        it("returns the json data type from the handler if path is found", async () => {
            const res = await request(app)
                .get(sensorReadingPath)
                .expect(200)
                .expect("Content-Type", /json/);

            expect(res.body.length).toEqual(sizeOfData);
        })
    })
})