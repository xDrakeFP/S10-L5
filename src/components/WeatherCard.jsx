import { Card } from "react-bootstrap";

const getCountryName = (code) => {
    try {
        const regionNames = new Intl.DisplayNames(["it"], { type: "region" });
        return regionNames.of(code);
    } catch {
        return code;
    }
};

const WeatherCard = ({ data }) => {
    const { name, sys, main, weather, dt, timezone } = data;

    const localDate = new Date((dt + timezone) * 1000);
    const localTime = localDate.toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
    });

    const countryName = getCountryName(sys.country);
    console.log(sys.country);
    console.log(countryName);

    return (
        <Card className="text-center shadow-sm h-100">
            <Card.Body>
                <Card.Title>
                    {name}, {countryName}
                </Card.Title>
                <p className="mb-2 text-muted">{localTime}</p>
                <img src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="Icona meteo" />
                <h3>{Math.round(main.temp)}°C</h3>
                <p className="text-muted">{weather[0].description}</p>
            </Card.Body>
        </Card>
    );
};

export default WeatherCard;
