import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiDayShowers,
  WiDayRain,
  WiDust,
  WiVolcano,
  WiStrongWind,
  WiTornado,
} from "react-icons/wi";

import React from "react";

const WeatherIcon = ({ description }) => {
  const getWeatherIcon = (description) => {
    switch (description.toLowerCase()) {
      case "clear sky":
        return <WiDaySunny size={48} color="#FFD700" />;
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
      case "overcast clouds":
        return <WiCloud size={48} color="#B0C4DE" />;
      case "light rain":
      case "moderate rain":
      case "heavy intensity rain":
      case "very heavy rain":
      case "extreme rain":
      case "freezing rain":
      case "light intensity shower rain":
      case "shower rain":
      case "heavy intensity shower rain":
      case "ragged shower rain":
        return <WiDayRain size={48} color="#00BFFF" />;
      case "light snow":
      case "snow":
      case "heavy snow":
      case "sleet":
      case "light shower sleet":
      case "shower sleet":
      case "light rain and snow":
      case "rain and snow":
      case "light shower snow":
      case "shower snow":
      case "heavy shower snow":
        return <WiSnow size={48} color="#00CED1" />;
      case "mist":
      case "smoke":
      case "haze":
      case "sand/ dust whirls":
      case "fog":
        return <WiFog size={48} color="#696969" />;
      case "sand":
      case "dust":
        return <WiDust size={48} color="#D3D3D3" />;
      case "volcanic ash":
        return <WiVolcano size={48} color="#808080" />;
      case "squalls":
        return <WiStrongWind size={48} color="#4682B4" />;
      case "tornado":
        return <WiTornado size={48} color="#808080" />;
      case "thunderstorm with light rain":
      case "thunderstorm with rain":
      case "thunderstorm with heavy rain":
      case "light thunderstorm":
      case "thunderstorm":
      case "heavy thunderstorm":
      case "ragged thunderstorm":
      case "thunderstorm with light drizzle":
      case "thunderstorm with drizzle":
      case "thunderstorm with heavy drizzle":
        return <WiThunderstorm size={48} color="#A52A2A" />;
      case "light intensity drizzle":
      case "drizzle":
      case "heavy intensity drizzle":
      case "light intensity drizzle rain":
      case "drizzle rain":
      case "heavy intensity drizzle rain":
      case "shower rain and drizzle":
      case "heavy shower rain and drizzle":
      case "shower drizzle":
        return <WiDayShowers size={48} color="#00BFFF" />;
      default:
        return <WiDaySunny size={48} color="#FFD700" />;
    }
  };

  return <>{getWeatherIcon(description)}</>;
};

export default WeatherIcon;
