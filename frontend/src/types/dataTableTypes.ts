export enum SortingDirectionEnum {
    ASC = "asc",
    DESC = "desc"
}

export type FieldTypes =
    | "id"
    | "name"
    | "box_id"
    | "sensor_type"
    | "range_l"
    | "range_u"
    | "longitude"
    | "latitude"
    | "reading"
    | "unit"
    | "reading_ts";

export interface SortingInterface {
    field: string;
    order: string;
}

export interface HeaderInterface {
    name: string;
    field: string;
    sortable: boolean;
}

// sorting only on sensor type and reading taken time
export const TableHeaders: HeaderInterface[] = [
    { name: "ID", field: "id", sortable: false },
    { name: "Box ID", field: "box_id", sortable: false },
    { name: "Sensor Type", field: "sensor_type", sortable: true },
    { name: "Name", field: "name", sortable: false },
    { name: "Lower Bound", field: "range_l", sortable: false },
    { name: "Upper Bound", field: "range_u", sortable: false },
    { name: "Longitude", field: "longitude", sortable: false },
    { name: "Latitude", field: "latitude", sortable: false },
    { name: "Reading", field: "reading", sortable: false },
    { name: "Unit", field: "unit", sortable: false },
    { name: "Reading Taken At", field: "reading_ts", sortable: true }
];
