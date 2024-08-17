import React from "react";
import "./Header.css";

const Header = ({ date, weather }) => {
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    return date.toLocaleDateString("ko-KR", options);
  };

  const getWeatherImage = (weather) => {
    if (!weather) return null;
    switch (weather?.weather[0]?.main) {
      case "Clear":
        return "/img/header_sunny.png";
      case "Clouds":
        return "/img/header_cloudy.png";
      case "Rain":
        return "/img/header_rainy.png";
      default:
        return null;
    }
  };

  return (
    <div className="header">
      <h2>{formatDate(date)}</h2>

      {weather && (
        <img
          src={getWeatherImage(weather)}
          alt="Weather"
          className="weather-image"
        />
      )}
    </div>
  );
};

export default Header;
