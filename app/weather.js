export const getWeatherData = async (location) => {
    try {
      const apiKey = ''

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();

      return {
        temperature: data.main.temp.toFixed(1),
        windSpeed: data.wind.speed.toFixed(1),
        highTemp: data.main.temp_max.toFixed(1),
        lowTemp: data.main.temp_min.toFixed(1),
        weatherCondition: data.weather[0].main,
      };

    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  };
  
