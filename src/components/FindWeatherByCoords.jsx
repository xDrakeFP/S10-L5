const key = "4240576e9c79b135b025636fe9fe0b03";

const FindWeatherByCoords = async (lat, lon) => {
    const finalUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=it`;
    console.log("Chiamata a:", finalUrl);
    const response = await fetch(finalUrl);
    {
        if (!response.ok) {
            throw new Error("Errore nel recupero dei dati meteo per coordinate");
        }
        return response.json();
    }
};

export default FindWeatherByCoords;
