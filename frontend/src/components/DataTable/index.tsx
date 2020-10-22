import React, { useState, useEffect, useMemo } from "react";
// components
import TableHeader from "./TableHeader";
import TableSearch from "./TableSearch";
import TablePagination from "./TablePagination";
import TableBody from "./TableBody";
// bootstrap
import { Table, Container, Row, Col, Form } from "react-bootstrap";
// data
import getSensorReadings from "../../api/ApiClient";
// types and constants
import {
    HeaderInterface,
    TableHeaders,
    SortingInterface,
    SortingDirectionEnum
} from "../../types/dataTableTypes";
import SensorReadingInterface from "../../types/sensorReadingType";
// config
import { env } from "../../services/Env";
// helpers
// import { getKeyValue } from "../../helpers/getKeyValue";
// constants
const apiUrl = env.api.URL || "https://localhost:5000";
const defaultApiUrl = `${apiUrl}/api/sensor/`;

const DataTable = () => {
    // state
    const [readings, setReadings] = useState<SensorReadingInterface[]>([]);
    const [url, setUrl] = useState<string>(defaultApiUrl);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(50);
    const [search, setSearch] = useState<string>("");
    const [sorting, setSorting] = useState<SortingInterface>({
        field: "",
        order: ""
    });

    const headers: HeaderInterface[] = TableHeaders;
    // side effects (componentDidMount and componentDidUpdate)
    useEffect(() => {
        setIsError(false);
        setIsLoading(true);

        try {
            // fetch data from the API
            const fetchSensorReadings = async () => {
                const data = await getSensorReadings(url);
                setReadings(data);
            };

            fetchSensorReadings();
        } catch (error) {
            setIsError(true);
            console.error(error);
        }

        setIsLoading(false);
    }, [url]);

    // useMemo function to process all the logic
    const readingData = useMemo(() => {
        let computeReadings: SensorReadingInterface[] = readings;
        console.info("computeReadings", computeReadings);

        // search / filter by type / name
        if (search) {
            computeReadings = computeReadings.filter(
                reading =>
                    reading.name.toLowerCase().includes(search.toLowerCase()) ||
                    reading.sensor_type.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(computeReadings.length);

        // sorting readings
        if (sorting.field) {
            const reverse = sorting.order === SortingDirectionEnum.ASC ? 1 : -1;
            computeReadings = computeReadings.sort(
                (a: any, b:any) =>
                    reverse * (a[sorting.field].localeCompare(b[sorting.field]))
            );
        }

        // current page slice
        computeReadings = computeReadings.slice(
            (currentPage - 1) * itemsPerPage,
            (currentPage - 1) * itemsPerPage + itemsPerPage
        );
        return computeReadings;
    }, [readings, currentPage, itemsPerPage, search, sorting]);

    return (
        <Container className="row mx-0 w-100">
            {isError && <div>Something went wrong ...</div>}

            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                    <>
                        <Row
                            className="mx-auto my-auto"
                            xs={12}
                            md={12}
                            lg={12}
                        >
                            <Col xs={12} md={10} lg={6}>
                                <TablePagination
                                    total={totalItems}
                                    itemsPerPage={itemsPerPage}
                                    currentPage={currentPage}
                                    onPageChange={(page: number) => setCurrentPage(page)}
                                />
                            </Col>
                            <Col xs={12} md={12} lg={4}>
                                <TableSearch
                                    onSearch={(value: string) => {
                                        setSearch(value);
                                        setCurrentPage(1);
                                    }}
                                />
                                <button
                                    style={{ display: "none" }}
                                    type="button"
                                    onClick={() => setUrl(defaultApiUrl)}
                                >
                                    Reload
                                </button>
                            </Col>
                            <Col xs={12} md={2} lg={2}>
                                <Form inline={true}>
                                    <Form.Group>
                                        <Form.Label className="mx-1">Items Per Page: </Form.Label>
                                        <Form.Control
                                            as="select"
                                            custom
                                            id="itemsPerPage"
                                            onChange={(
                                                event: React.ChangeEvent<HTMLSelectElement>
                                            ): void => setItemsPerPage(parseInt(event.target.value))}
                                            value={itemsPerPage}
                                        >
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row
                            xs={12}
                            md={12}
                            lg={12}
                        >
                            <Table responsive="md" striped={true} bordered={true} hover={true}>
                                <TableHeader
                                    headers={headers}
                                    onSorting={(field: string, order: string) => {
                                        setSorting({ field, order })
                                    }}
                                />
                                <TableBody data={readingData} />
                            </Table>
                        </Row>
                    </>
                )}
        </Container>
    );
};

export default DataTable;
