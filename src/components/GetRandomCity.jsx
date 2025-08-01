import FindWeather from "./FindWeather";

const getCityToValidate = async () => {
    const response = await fetch("https://countriesnow.space/api/v0.1/countries/population/cities"); // API per avere un elenco di città
    const cities = await response.json();

    if (!cities.data || !Array.isArray(cities.data)) {
        throw new Error("API non valida o dati non ricevuti");
    }

    const randomIndex = Math.floor(Math.random() * cities.data.length);
    return cities.data[randomIndex].city;
};

const getRandomCityFromAPI = async () => {
    while (true) {
        try {
            const city = await getCityToValidate();
            const data = await FindWeather(city);
            console.log(`Trovata città valida: ${data.name},${data.sys.country}`);
            return `${data.name},${data.sys.country}`;
        } catch (err) {
            console.log(err, "Tentativo non valido");
            await new Promise((r) => setTimeout(r, 200)); // piccolo delay per evitare spam e blocchi
        }
    }
};

export default getRandomCityFromAPI;
