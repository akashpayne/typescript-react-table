import React, { useState } from "react";
import { Form } from "react-bootstrap";

const TableSearch = (props: { onSearch: (value: string) => void }) => {
    const [search, setSearch] = useState("");

    const onInputChange = (value: string) => {
        setSearch(value);
        props.onSearch(value);
    };

    return (
        <Form inline className="w-100">
            <fieldset>
                <Form.Group>
                    <Form.Control
                        type="text"
                        className="mx-sm-3"
                        id="inputSearch"
                        aria-describedby="searchHelpInline"
                        placeholder={search||"Filter by name or type"}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            onInputChange(e.target.value)
                        }
                    />
                </Form.Group>
            </fieldset>
        </Form>
    );
};

export default TableSearch;
