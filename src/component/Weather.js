import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "antd";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchTime, setSearchTime] = useState(null);
  const [searchDate, setSearchDate] = useState(null);
  const [weatherPoster, setWeatherPoster] = useState(null);
  const [country, setCountry] = useState(null);

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=5&appid=2d40fb0f24dc0d7d82d5a03bf5a013af
        8`
      );
      setWeatherData(response.data);

      setSearchTime(new Date().toLocaleTimeString());
      setSearchDate(new Date().toLocaleDateString());

      const countryName = response.data.city.country;
      setCountry(countryName);

      const weatherConditionCode = response.data.list[0].weather[0].icon;
      const weatherPosterUrl = `http://openweathermap.org/img/wn/${weatherConditionCode}.png`;
      setWeatherPoster(weatherPosterUrl);

      console.log(response, "response");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (weatherData) {
        fetchWeatherData(weatherData.city.name);
      }
    }, 5000000);

    return () => clearInterval(interval);
  }, [weatherData]);

  return (
    <div
      className="weather-app"
      style={{ padding: "30px", backgroundColor: "#d6d4e1", minHeight:"100%" }}
    >
      <Input
        type="text"
        placeholder="Enter city name"
        onChange={(e) => fetchWeatherData(e.target.value)}
        style={{ width: "40%" }}
      />
      {weatherData && (
        <div
          style={{
            padding: "60px",
            marginTop: "100px",
            borderRadius: "4px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
                {weatherData.city.name},{country}
              </h2>
              <p style={{ fontSize: "0.8rem", marginBottom: "0.5rem" }}>
                {searchDate} , {searchTime}
              </p>
            </div>
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#00295e",
                borderRadius: "20px",
              }}
            >
              <img
                style={{ width: "100px" }}
                src={weatherPoster}
                alt={weatherData.list[0].weather[0].description }
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "50px",
            }}
          >
            <p
              style={{
                fontSize: "1.2rem",
                marginBottom: "0.5rem",
                border: "1px black solid",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "#00295e",
                color: "#ffff",
              }}
            >
              temp : {(weatherData.list[0].main.temp - 273.15).toFixed(1)} °C
            </p>

            <p
              style={{
                fontSize: "1.2rem",
                marginBottom: "0.5rem",
                border: "1px black solid",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "#00295e",
                color: "#ffff",
              }}
            >
              Weather : {weatherData.list[0].weather[0].description}
            </p>
            <p
              style={{
                fontSize: "1.2rem",
                marginBottom: "0.5rem",
                border: "1px black solid",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "#00295e",
                color: "#ffff",
              }}
            >
              Cloud : {weatherData.list[0].clouds.all} %
            </p>
            <p
              style={{
                fontSize: "1.2rem",
                marginBottom: "0.5rem",
                border: "1px black solid",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "#00295e",
                color: "#ffff",
              }}
            >
              Wind : {weatherData.list[0].wind.speed} m/s
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "50px",      

            }}
          >
            {weatherData.list.map((item) => {
              const dateTime = item.dt_txt.split(" ")[1];

              return (
                <div
                  key={item.dt}
                  style={{
                    width: "100px",
                    height: "150px",
                    backgroundColor: "#00295e",
                    color: "white",
                    padding: "10px",
                    borderRadius: "20px",
                  }}
                >
                  {console.log(item.dt_txt, "item")}
                  <p>{dateTime} </p>
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt={item.weather[0].description}
                  />
                  <p>{(item.main.temp - 273.15).toFixed(1)}°C</p>
                </div>
              );
            })} 
            
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
