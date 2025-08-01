import FindWeather from "./FindWeather";
import FindForecast from "./FindForecast";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Spinner, Alert, Card, Button } from "react-bootstrap";

const getCountryName = (code) => {
    try {
        const regionNames = new Intl.DisplayNames(["it"], { type: "region" });
        return regionNames.of(code);
    } catch {
        return code;
    }
};

const CityDetails = () => {
    const { cityName } = useParams();

    const [notFound, setNotFound] = useState(false);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [forecast, setForecast] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const loadWeather = async () => {
            try {
                setLoading(true);
                setNotFound(false);
                const weather = await FindWeather(cityName);
                setWeather(weather);
                const forecastData = await FindForecast(decodeURIComponent(cityName));
                setForecast(forecastData);
            } catch (err) {
                setNotFound(true);
                console.log("Citta non trovata", err);
            } finally {
                setLoading(false);
            }
        };
        loadWeather();
    }, [cityName]);

    if (loading) {
        return (
            <Container className="text-center mt-4">
                <Spinner animation="border" />
                <p>Caricamento dati meteo...</p>
            </Container>
        );
    }

    if (notFound) {
        return (
            <Alert variant="warning" className="text-center">
                Nessun risultato trovato per <strong>{decodeURIComponent(cityName)}</strong>. Prova con un'altra città.
            </Alert>
        );
    }

    return (
        <>
            <Container className="mt-4">
                <Button variant="secondary" className="mb-3 w-100" onClick={() => navigate("/")}>
                    Torna alla Home
                </Button>
                <Card className="text-center">
                    <Card.Body>
                        <h2>
                            {weather.name}, {getCountryName(weather.sys.country)}
                        </h2>

                        <p className="mb-2 text-muted">
                            {new Date((weather.dt + weather.timezone) * 1000).toLocaleTimeString("it-IT", {
                                hour: "2-digit",
                                minute: "2-digit",
                                timeZone: "UTC",
                            })}
                        </p>

                        <h4>{weather.weather[0].description}</h4>
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Icona meteo" />
                        <h1>{Math.round(weather.main.temp)}°C</h1>
                        <p>Umidità: {weather.main.humidity}%</p>
                        <p>Vento: {weather.wind.speed} m/s</p>
                    </Card.Body>
                </Card>
                {forecast && (
                    <>
                        <h4 className="mt-4 mb-3 text-center">Previsioni nei prossimi giorni</h4>
                        <div className="forecast-container">
                            {Object.entries(
                                forecast.list.reduce((acc, entry) => {
                                    const day = new Date(entry.dt * 1000).toLocaleDateString("it-IT", { weekday: "long" });
                                    if (!acc[day]) acc[day] = [];
                                    if (acc[day].length < 3) acc[day].push(entry);
                                    return acc;
                                }, {})
                            )
                                .slice(0, 5)
                                .map(([day, entries]) => (
                                    <div className="day-column text-center" key={day}>
                                        <h6 className="mb-2">{day.charAt(0).toUpperCase() + day.slice(1)}</h6>
                                        <div className="forecast-flex-container">
                                            {entries.map((entry) => (
                                                <div className="forecast-box text-center" key={entry.dt}>
                                                    <div>
                                                        {new Date(entry.dt * 1000).toLocaleTimeString("it-IT", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </div>
                                                    <img className="weather-icon" src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`} alt="icon" />
                                                    <div>
                                                        <strong>{Math.round(entry.main.temp)}°C</strong>
                                                    </div>
                                                    <small>{entry.weather[0].description}</small>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </>
                )}
            </Container>
        </>
    );
};

export default CityDetails;
