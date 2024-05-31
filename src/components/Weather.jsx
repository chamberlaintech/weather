import React, { useEffect, useState } from "react";
import Search from "./Search";
import Loading from "./Loading";
import WeatherIcon from "./WeatherIcon";

const Weather = () => {
  const [loading, setLoading] = useState(false);
  const [dailyWeather, setDailyWeather] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const fetchData = async (param) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        setDailyWeather(data);
        setLoading(false);
      } else {
        setLoading(false);
        setError(data.message || "An error occurred");
      }
    } catch (e) {
      setLoading(false);
      setError("An error occurred");
    }
  };

  const fetchSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`
      );
      const data = await response.json();
      if (data && data.list) {
        const uniqueSuggestions = [];
        const addedCities = new Set(); // Keep track of added cities
        data.list.forEach((city) => {
          const cityKey = `${city.name}, ${city.sys.country}`;
          if (!addedCities.has(cityKey)) {
            uniqueSuggestions.push(city);
            addedCities.add(cityKey);
          }
        });
        setSuggestions(uniqueSuggestions);
      }
    } catch (e) {
      setError("An error occurred");
    }
  };

  const handleSearch = () => {
    fetchData(search);
    setSuggestions([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
    fetchSuggestions(event.target.value);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    fetchData("london");
  }, []);

  const handleSearchBySuggestion = (cityName, countryCode) => {
    setSearch(`${cityName}, ${countryCode}`);
    setSuggestions([]);
    fetchData(`${cityName},${countryCode}`);
  };

  return (
    <div className={`weather-container ${loading ? "loader-container" : ""}`}>
      <div
        className={`weather-container-title ${loading ? "loader-title" : ""}`}
      >
        <h1>Weather App</h1>
      </div>
      <div className={`search-container ${loading ? "loader-search" : ""}`}>
        <Search
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
        />
        <div className="suggestion-container">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion"
              onClick={() =>
                handleSearchBySuggestion(
                  suggestion.name,
                  suggestion.sys.country
                )
              }
            >
              {suggestion.name}, {suggestion.sys.country}
            </div>
          ))}
        </div>
      </div>
      {error && (
        <div className="error-message">
          <h3>{error}</h3>
        </div>
      )}
      {!error && !loading && dailyWeather && (
        <div className="current-weather">
          <h2>Current weather</h2>
          <div className="weather-info">
            <div className="location-date">
              <h3>
                {dailyWeather?.name}, {dailyWeather?.sys?.country}
              </h3>
              <span>{getCurrentDate()}</span>
            </div>
            <div className="temp-desc">
              {dailyWeather && dailyWeather.main && (
                <>
                  <h3>{Math.round(dailyWeather.main.temp)} °C</h3>
                  <WeatherIcon
                    description={dailyWeather.weather[0].description}
                  />
                  <p>{dailyWeather.weather[0].description}</p>
                </>
              )}
            </div>
          </div>
          <div className="air-conditions">
            <h2>air conditions</h2>
            <div className="air-conditions-info">
              <div className="realfeel">
                <p>real feel</p>
                {dailyWeather && dailyWeather.main && (
                  <h3>{Math.round(dailyWeather.main.feels_like)} °C</h3>
                )}
              </div>
              <div className="wind">
                <p>wind</p>
                <h3>{dailyWeather?.wind?.speed} m/s</h3>
              </div>
              <div className="clouds">
                <p>clouds</p>
                <h3>{dailyWeather?.clouds?.all} %</h3>
              </div>
              <div className="humidity">
                <p>humidity</p>
                <h3>{dailyWeather?.main?.humidity} %</h3>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default Weather;
