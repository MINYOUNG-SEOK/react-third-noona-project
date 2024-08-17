import React from "react";
import { Button } from "react-bootstrap";
import "./WeatherButton.css";

const WeatherButton = ({
  cities,
  setCity,
  getCurrentLocation,
  activeButton,
}) => {
  return (
    <div className="button-container">
      <Button
        className={`weather-button ${
          activeButton === "Current Location" ? "active" : ""
        }`}
        onClick={getCurrentLocation}
      >
        Current Location
      </Button>
      {cities.map((item, index) => (
        <Button
          className={`weather-button ${activeButton === item ? "active" : ""}`}
          key={index}
          onClick={() => setCity(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
