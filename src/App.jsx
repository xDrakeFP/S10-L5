import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNavBar from "./components/MyNavBar";
import MyHome from "./components/MyHome";
import CityDetails from "./components/CityDetails";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved === "true";
    });

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    return (
        <BrowserRouter>
            <MyNavBar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Routes>
                <Route path="/" element={<MyHome />} />
                <Route path="/city/:cityName" element={<CityDetails />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
