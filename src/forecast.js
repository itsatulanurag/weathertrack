import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import apiKey from "./apiKey";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});

  const search = (city) => {
    axios
      .get(
        `${apiKey.base}weather?q=${city != "[object Object]" ? city : query}
          &APPID=${apiKey.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  return (
    <div className="forecast text-center">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
        <h3>{props.weather}</h3>
      </div>
      <div className="today-weather">
        <br></br>
        <div className="search-box">
          <input
            type="text"
            className="search-box"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div>
        <div className="img-box">
          {""}
          <img
            src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
            onClick={search}
            alt="search"
          />
        </div>
        <ul>
          {typeof weather.main != "undefined" ? (
            <div>
              {" "}
              <li className="city-head">
                <p>
                  {weather.name}, {weather.sys.country}
                  <span className="temp">
                    <img
                      className="temp"
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                      alt="{weather.weather[0].main}"
                    />
                  </span>
                </p>
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp - 273)}° C (
                  {weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity <span className="temp">{weather.main.humidity}%</span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {weather.visibility / 1000} Km{" "}
                  {/* miles to kilometer to be done */}
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">{weather.wind.speed} Km/h</span>
              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Forecast;
