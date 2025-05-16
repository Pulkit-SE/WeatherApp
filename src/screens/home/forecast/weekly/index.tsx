// components/WeeklyForecast.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {DailyForecast} from '../../../../utils/types/weathers';
import WeatherIcon from '../../../../components/icon';

interface WeeklyForecastProps {
  dailyData: DailyForecast[];
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({dailyData}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>7-day forecast</Text>
      <View style={styles.forecastContainer}>
        {dailyData.map((day, index) => (
          <View
            key={index}
            style={[
              styles.dayRow,
              index === dailyData.length - 1 ? styles.lastDayRow : null,
            ]}>
            <Text style={styles.dayText}>{day.day}</Text>
            <View style={styles.iconContainer}>
              <WeatherIcon type={day.icon} size={24} />
            </View>
            <View style={styles.temperatureContainer}>
              <Text style={styles.minTempText}>{day.minTemp}°C</Text>
              <Text style={styles.maxTempText}>{day.maxTemp}°C</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 12,
    fontFamily: 'System',
  },
  forecastContainer: {
    backgroundColor: 'rgba(30, 30, 30, 0.7)',
    borderRadius: 12,
    padding: 16,
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  lastDayRow: {
    borderBottomWidth: 0,
  },
  dayText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'System',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  temperatureContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  minTempText: {
    color: '#999999',
    fontSize: 16,
    marginRight: 8,
    fontFamily: 'System',
  },
  maxTempText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'System',
  },
});

export default WeeklyForecast;
