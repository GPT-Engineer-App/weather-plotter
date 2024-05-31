import React, { useState } from 'react';
import { Box, Button, Input, VStack, Heading, Text } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { FaSearch } from 'react-icons/fa';

const Index = () => {
  const [city, setCity] = useState('');
  const [temperatureData, setTemperatureData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`);
      const data = await response.json();
      if (data.cod !== 200) {
        setError(data.message);
        setTemperatureData(null);
      } else {
        setTemperatureData(data.main.temp);
        setError(null);
      }
    } catch (err) {
      setError('Failed to fetch data');
      setTemperatureData(null);
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Heading>Weather App</Heading>
        <Input
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button leftIcon={<FaSearch />} onClick={fetchWeatherData}>
          Get Temperature
        </Button>
        {error && <Text color="red.500">{error}</Text>}
        {temperatureData && (
          <Box width="100%" maxWidth="600px">
            <Line
              data={{
                labels: ['Temperature'],
                datasets: [
                  {
                    label: `Temperature in ${city}`,
                    data: [temperatureData],
                    borderColor: 'rgba(75,192,192,1)',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Index;