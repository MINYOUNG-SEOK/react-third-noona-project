import React from "react";
import "./MainWeather.css";

const MainWeather = ({ weather }) => {
  const getWeatherIcon = (weather) => {
    if (!weather) return null;
    switch (weather?.weather[0]?.main) {
      case "Clouds":
        return "/img/cloudy.png";
      case "Rain":
        return "/img/rain.png";
      case "Clear":
        return "/img/sunny.png";
      case "Snow":
        return "/img/snow.png";
      default:
        return "/img/default.png";
    }
  };

  const getWeatherDescription = (main) => {
    switch (main) {
      case "Clear":
        return "맑음";
      case "Clouds":
        return "흐림";
      case "Rain":
        return "비옴";
      case "Snow":
        return "눈옴";
      default:
        return "알 수 없음";
    }
  };

  return (
    <div className="main-weather">
      <div className="weather-info">
        <div className="nameAndDescription">
          <div className="city-name">{weather?.name}</div>
          <div className="weather-description">
            {getWeatherDescription(weather?.weather[0]?.main)}{" "}
          </div>
        </div>
        <img
          src={getWeatherIcon(weather)}
          alt="Weather Icon"
          className="weather-icon"
        />
        <div className="temperature">{weather?.main.temp}°</div>
      </div>
      <div className="description">{weather?.weather[0]?.description}</div>
      <div className="additional-info">
        <div className="info-row">
          <span className="label">최저</span>
          <span className="value low-temp">{weather?.main.temp_min}°</span>
          <span className="label">풍속</span>
          <span className="value">{weather?.wind.speed}km/h</span>
        </div>
        <div className="info-row">
          <span className="label">최고</span>
          <span className="value high-temp">{weather?.main.temp_max}°</span>
          <span className="label">강수량</span>
          <span className="value">
            {weather?.rain ? `${weather.rain["1h"]}mm/h` : "0mm/h"}
          </span>
        </div>
        <div className="info-row">
          <span className="label">미세먼지</span>
          <span className="value">
            {weather?.main.humidity > 50 ? "높음" : "보통"}
          </span>
          <span className="label">체감온도</span>
          <span className="value">{weather?.main.feels_like}°</span>
        </div>
      </div>
    </div>
  );
};

export default MainWeather;
