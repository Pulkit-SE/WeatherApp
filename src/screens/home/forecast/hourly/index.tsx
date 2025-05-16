import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {HourlyForecast as HourlyForecastType} from '../../../../utils/types/weathers';
import WeatherIcon from '../../../../components/icon';

interface HourlyForecastProps {
  hourlyData: HourlyForecastType[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({hourlyData}) => {
  const renderItem = ({item}: {item: HourlyForecastType}) => {
    return (
      <View style={styles.hourItem}>
        <Text style={styles.timeText}>{item.time}</Text>
        <WeatherIcon type={item.icon} size={32} />
        <Text style={styles.tempText}>{item.temp}°</Text>
        <View style={styles.windContainer}>
          <Text style={styles.windIcon}>💨</Text>
          <Text style={styles.windText}>{item.wind} km/h</Text>
        </View>
        <View style={styles.precipitationContainer}>
          <Text style={styles.umbrellaIcon}>☔️</Text>
          <Text style={styles.precipitationText}>{item.precipitation}%</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forecast for today</Text>
      <FlatList
        contentContainerStyle={styles.forecastContainer}
        data={hourlyData}
        renderItem={renderItem}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 12,
    fontFamily: 'System',
  },
  forecastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(30, 30, 30, 0.7)',
    borderRadius: 12,
    padding: 16,
  },
  hourItem: {
    alignItems: 'center',
    flex: 1,
  },
  timeText: {
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'System',
  },
  tempText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    fontFamily: 'System',
  },
  windContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  windIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  windText: {
    color: '#CCCCCC',
    fontSize: 12,
    fontFamily: 'System',
  },
  precipitationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  umbrellaIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  precipitationText: {
    color: '#3b68c7',
    fontSize: 12,
    fontFamily: 'System',
  },
});

export default HourlyForecast;
