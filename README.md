# Weather Trend Planner

A modern React app that helps you plan your activities by displaying current weather conditions and a 5-day temperature trend forecast.

## Features

- **City Search** - Enter any city name to get current weather data
- **Current Weather** - View real-time temperature and weather conditions
- **Temperature Trend Chart** - Visual representation of temperature changes over the next 5 days
- **Smart Insight** - Get personalized recommendations for the best day to go out based on temperature

## Tech Stack

- **React** - UI framework
- **Chart.js** - Data visualization for temperature trends
- **CSS** - Custom styling
- **Vite** - Build tool and dev server
- **OpenWeatherMap API** - Weather data source

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd react
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

4. Add your OpenWeatherMap API key to `.env`:

```
VITE_API_KEY=your_api_key_here
```

Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)

## Running the App

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

## Usage

1. Enter a city name in the search box (e.g., "London")
2. Click "Search" or press Enter
3. View the current weather conditions
4. Check the temperature trend chart showing the next 5 days
5. Read the insight to find the best day to go out

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Environment Variables

The app uses Vite environment variables. Your API key is stored in `.env` (not committed to Git for security).

See `.env.example` for required variables.

## License

MIT

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

