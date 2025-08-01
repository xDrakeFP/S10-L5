import { Navbar, Container, Button, Spinner, Nav } from "react-bootstrap";
import SearchForm from "./SearchForm";
import FindWeatherByCoords from "./FindWeatherByCoords";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyNavBar = ({ darkMode, setDarkMode }) => {
    const [loadingLocation, setLoadingLocation] = useState(false);
    const navigate = useNavigate();
    const getLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocalizzazione non supportata dal browser");
            return;
        }

        setLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const data = await FindWeatherByCoords(latitude, longitude);
                    const cityAndCountry = `${data.name},${data.sys.country}`;
                    navigate(`/city/${encodeURIComponent(cityAndCountry)}`);
                } catch (err) {
                    alert("Impossibile ottenere il meteo dalla tua posizione");
                    console.error(err);
                } finally {
                    setLoadingLocation(false);
                }
            },
            (error) => {
                console.error("Errore geolocalizzazione:", error.code, error.message);

                let msg = "Errore nella geolocalizzazione.";
                if (error.code === 1) msg = "Permesso negato per la posizione.";
                if (error.code === 2) msg = "Posizione non disponibile.";
                if (error.code === 3) msg = "Timeout nella richiesta della posizione.";

                alert(msg);
                setLoadingLocation(false);
            }
        );
    };
    return (
        <Navbar expand="md" bg="secondary" variant="dark" className="mb-3">
            <Container>
                <Navbar.Brand href="/">
                    <img src="https://www.comparacorsi.it/wp-content/uploads/2023/07/EPICODE.png" alt="Logo EPICODE" height="40" className="me-2" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto w-100 d-flex flex-column flex-md-row align-items-stretch gap-2">
                        <div className="flex-fill">
                            <SearchForm />
                        </div>
                        <div className="flex-fill">
                            <Button variant="success" onClick={getLocation} disabled={loadingLocation} className="w-100">
                                {loadingLocation ? (
                                    <>
                                        <Spinner size="sm" animation="border" className="me-2" />
                                        Posizione in corso...
                                    </>
                                ) : (
                                    "Meteo vicino a me"
                                )}
                            </Button>
                        </div>
                        <Button variant={darkMode ? "light" : "dark"} size="sm" onClick={() => setDarkMode(!darkMode)} className="w-md-auto">
                            {darkMode ? "Light Mode" : " Dark Mode"}
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavBar;
