import { Form, Button, InputGroup, FormControl } from "react-bootstrap";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
    const [city, setCity] = useState("");
    const navigate = useNavigate();

    const formSubmit = (e) => {
        e.preventDefault();
        if (city.trim() !== "") {
            navigate(`/city/${city.trim()}`);
            setCity("");
        }
        console.log("Searching for:", city);
    };

    return (
        <Form onSubmit={formSubmit} className="d-flex">
            <InputGroup>
                <FormControl
                    type="text"
                    placeholder="Cerca città"
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value);
                    }}
                ></FormControl>
                <Button variant="primary" type="submit">
                    <i className="bi bi-search"></i>
                </Button>
            </InputGroup>
        </Form>
    );
};

export default SearchForm;
