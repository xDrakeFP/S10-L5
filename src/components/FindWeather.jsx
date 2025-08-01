const key = "4240576e9c79b135b025636fe9fe0b03";
const api = "https://api.openweathermap.org/data/2.5/weather";

const FindWeather = async (cityName) => {
    const weatherData = await fetch(`${api}?q=${encodeURIComponent(cityName)}&appid=${key}&units=metric&lang=it`);

    if (!weatherData.ok) {
        console.log("Risposta API:", weatherData.status);
        throw new Error("Città non trovata");
    }

    return weatherData.json();
};

export default FindWeather;
