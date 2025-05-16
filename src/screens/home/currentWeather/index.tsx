// components/CurrentWeather.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import WeatherIcon from '../../../components/icon';

interface CurrentWeatherProps {
  temperature: number;
  condition: string;
  minTemp: number;
  maxTemp: number;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  temperature,
  condition,
  minTemp,
  maxTemp,
}) => {
  // Map condition text to icon type
  const mapConditionToIcon = (conditionText: string): string => {
    const lowerCondition = conditionText.toLowerCase();

    if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) {
      return 'sunny';
    } else if (lowerCondition.includes('partly cloudy')) {
      return 'partly-cloudy';
    } else if (
      lowerCondition.includes('cloudy') ||
      lowerCondition.includes('overcast')
    ) {
      return 'cloudy';
    } else if (
      lowerCondition.includes('mist') ||
      lowerCondition.includes('fog')
    ) {
      return 'fog';
    } else if (
      lowerCondition.includes('light rain') ||
      lowerCondition.includes('drizzle')
    ) {
      return 'light-rain';
    } else if (
      lowerCondition.includes('rain') ||
      lowerCondition.includes('shower')
    ) {
      return 'heavy-rain';
    } else if (
      lowerCondition.includes('snow') &&
      lowerCondition.includes('heavy')
    ) {
      return 'snow-storm';
    } else if (lowerCondition.includes('snow')) {
      return 'snow';
    } else if (
      lowerCondition.includes('thunder') ||
      lowerCondition.includes('storm')
    ) {
      return 'thunderstorm';
    } else {
      return 'partly-cloudy'; // Default
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.temperature}>{temperature}°C</Text>
      <View style={styles.conditionContainer}>
        <WeatherIcon type={mapConditionToIcon(condition)} size={30} />
        <Text style={styles.condition}>{condition}</Text>
      </View>
      <View style={styles.separator} />
      <Text style={styles.minMaxTemp}>
        {minTemp}°C/{maxTemp}°C
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  temperature: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#3b68c7',
    fontFamily: 'System',
  },
  conditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  condition: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 8,
    fontFamily: 'System',
  },
  separator: {
    height: 1,
    backgroundColor: '#333333',
    width: '80%',
    marginVertical: 16,
  },
  minMaxTemp: {
    fontSize: 16,
    color: '#CCCCCC',
    fontFamily: 'System',
  },
});

export default CurrentWeather;
