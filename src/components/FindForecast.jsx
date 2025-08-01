const key = "4240576e9c79b135b025636fe9fe0b03";
const FindForecast = async (cityName) => {
    const finalUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${key}&units=metric&lang=it`;

    const response = await fetch(finalUrl);
    if (!response.ok) {
        throw new Error("Errore nel recupero delle previsioni");
    }

    return response.json();
};

export default FindForecast;
