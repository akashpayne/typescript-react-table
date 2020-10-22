import React, { useState } from "react";
import {
    HeaderInterface,
    SortingDirectionEnum
} from "../../types/dataTableTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const TableHeader = (props: {
    headers: HeaderInterface[];
    onSorting: (field: string, order: string) => void;
}) => {
    const [sortingField, setSortingField] = useState<string>("");
    const [sortingOrder, setSortingOrder] = useState(SortingDirectionEnum.ASC);

    const onSortingChange = (field: string) => {
        const order =
            (field === sortingField) && (sortingOrder === SortingDirectionEnum.ASC)
                ? SortingDirectionEnum.DESC
                : SortingDirectionEnum.ASC;
        setSortingField(field);
        setSortingOrder(order);
        // callback
        props.onSorting(field, order);
    };

    if (!Array.isArray(props.headers)) {
        return (
            <thead>
                <tr>Error on Table Header</tr>
            </thead>
        );
    }
    return (
        <thead>
            <tr>
                {props.headers.map((item: HeaderInterface) => {
                    return (
                        <th
                            key={item.field}
                            onClick={() =>
                                item.sortable ? onSortingChange(item.field) : null
                            }
                            style={{cursor:"pointer"}}
                        >
                            <p>
                                {item.name}
                                {item.sortable && (<span>*</span>)}
                            </p>
                            {sortingField && sortingField === item.field && (
                                <span>
                                    <FontAwesomeIcon
                                        icon={
                                            sortingOrder === SortingDirectionEnum.ASC
                                                ? faArrowDown
                                                : faArrowUp
                                        }
                                    />
                                </span>
                            )}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};

export default TableHeader;
