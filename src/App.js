import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import MainWeather from "./components/MainWeather";
import WeatherButton from "./components/WeatherButton";
import "./App.css";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("Current Location");
  const cities = ["Seoul", "Busan", "Sydney", "Osaka", "London"];

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("위치 서비스를 지원하지 않습니다.");
      return;
    }
    setLoading(true);
    setActiveButton("Current Location");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        await getWeatherByLocation(lat, lon);
      },
      (error) => {
        alert("위치 정보를 가져올 수 없습니다. 다시 시도해주세요.");
        setLoading(false);
      }
    );
  };

  const apiKey = process.env.WATHER_API_KEY;
  const getWeatherByLocation = async (lat, lon) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert("위치 정보를 가져올 수 없습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCity = async (city) => {
    setCity(city);
    setActiveButton(city);
    setLoading(true);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&aappid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert("위치 정보를 가져올 수 없습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {loading ? (
        <ClipLoader color="#f88c6b" loading={loading} size={150} />
      ) : (
        <div className="weather-box">
          <Header date={new Date()} weather={weather} />
          <MainWeather weather={weather} />
        </div>
      )}
      <div>
        <WeatherButton
          cities={cities}
          setCity={getWeatherByCity}
          getCurrentLocation={getCurrentLocation}
          activeButton={activeButton}
        />
      </div>
    </div>
  );
}

export default App;
