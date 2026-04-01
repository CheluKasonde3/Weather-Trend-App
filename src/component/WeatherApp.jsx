import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

// ✅ API key from environment variable
const API_KEY = import.meta.env.VITE_API_KEY;

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`,
    );
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`City not found: ${errText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
}

function processForecast(data) {
  const dailyTemps = {};
  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!dailyTemps[date]) dailyTemps[date] = [];
    dailyTemps[date].push(item.main.temp);
  });

  return Object.keys(dailyTemps).map((date) => {
    const temps = dailyTemps[date];
    const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
    return { date, temp: avgTemp };
  });
}

function generateInsight(data, cityName) {
  let bestDay = data[0];
  const idealTemp = 18;

  data.forEach((day) => {
    const currentDiff = Math.abs(day.temp - idealTemp);
    const bestDiff = Math.abs(bestDay.temp - idealTemp);
    if (currentDiff < bestDiff) {
      bestDay = day;
    }
  });

  if (bestDay.temp > 35)
    return `Heat warning in ${cityName}: ${bestDay.date} (${bestDay.temp.toFixed(0)}°C)`;
  if (bestDay.temp < 5)
    return `Cold warning in ${cityName}: ${bestDay.date} (${bestDay.temp.toFixed(0)}°C)`;

  return `Best day to go out: ${bestDay.date} (${bestDay.temp.toFixed(0)}°C)`;
}

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [insight, setInsight] = useState("");

  const handleSearch = async () => {
    try {
      const data = await fetchWeather(city);
      setWeather({
        name: data.city.name,
        temp: data.list[0].main.temp,
        condition: data.list[0].weather[0].description,
      });
      const processed = processForecast(data);
      setForecast(processed);
      setInsight(generateInsight(processed, data.city.name));
    } catch (error) {
      setWeather(null);
      setForecast([]);
      setInsight("City not found or error fetching data.");
    }
  };

  // Format forecast labels to show day of week
  const getDayOfWeek = (dateStr) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(dateStr);
    return days[date.getDay()];
  };

  const chartData = {
    labels: forecast.map((f) => getDayOfWeek(f.date)),
    datasets: [
      {
        label: "Temperature (°C)",
        data: forecast.map((f) => f.temp),
        borderColor: "#333",
        backgroundColor: "transparent",
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: "#333",
        pointBorderColor: "#333",
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 15,
        max: 30,
        ticks: {
          stepSize: 5,
        },
        grid: {
          color: "#e0e0e0",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="weather-container">
      <div className="search-box">
        <label>Enter city:</label>
        <input
          type="text"
          placeholder="London"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {weather && (
        <div className="weather-info">
          <h3>{weather.name}</h3>
          <p>Current Temperature: {Math.round(weather.temp)}°C</p>
          <p>
            Condition:{" "}
            {weather.condition.charAt(0).toUpperCase() +
              weather.condition.slice(1)}
          </p>
        </div>
      )}

      {forecast.length > 0 && (
        <div className="chart-box">
          <h3>Temperature Trend</h3>
          <div style={{ position: "relative", height: "280px" }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      {insight && (
        <div className="insight-box">
          <h3>Insight:</h3>
          <p>{insight}</p>
        </div>
      )}
    </div>
  );
}
