import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FindWeather from "./FindWeather";
import WeatherCard from "./WeatherCard";
import getRandomCityFromAPI from "./GetRandomCity";

const defaultCities = ["Roma,IT", "Tokyo,JP", "New York,US", "London,GB", "Paris,FR", "Pechino,CN", "Madrid,ES", "Toronto,CA"];

const MyHome = () => {
    const [citiesData, setCitiesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCitiesWeather = async () => {
            try {
                const weather = await Promise.all(defaultCities.map((city) => FindWeather(city)));
                setCitiesData(weather);
            } catch (err) {
                setError(true);
                console.log("Errore nel caricamento meteo", err);
            } finally {
                setLoading(false);
            }
        };
        loadCitiesWeather();
    }, []);

    const goToRandomCity = async () => {
        try {
            const randomCity = await getRandomCityFromAPI();
            navigate(`/city/${randomCity}`);
        } catch (err) {
            console.log("errore", err);
        }
    };

    if (loading) {
        return (
            <Container className="text-center mt-4">
                <Spinner animation="border" />
                <p>Caricamento meteo città...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">Errore nel caricamento dei dati meteo.</Alert>
            </Container>
        );
    }

    return (
        <>
            <Container className="mt-4">
                <Button variant="dark" className="mb-4 w-100" onClick={goToRandomCity}>
                    Mi sento fortunato
                </Button>
                <Row>
                    {citiesData.map((city) => (
                        <Col key={city.id} md={6} className="mb-4">
                            <Link to={`/city/${encodeURIComponent(`${city.name},${city.sys.country}`)}`} style={{ textDecoration: "none" }}>
                                <WeatherCard data={city} />
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default MyHome;
