import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import Header from '../../components/header';
import LocationDisplay from './locationDisplay';
import CurrentWeather from './currentWeather';
import HourlyForecast from './forecast/hourly';
import WeeklyForecast from './forecast/weekly';
import {WeatherData} from '../../utils/types/weathers';
import {fetchWeatherData} from '../../utils/api';
import {styles} from './styles';
import {useTheme} from '../../utils/hooks/useTheme';
import {updateTheme} from '../../redux/actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import isEmpty from 'lodash.isempty';
import EmptyWidget from './emptyWidget';
import {setWeatherData} from '../../redux/actions/weatherActions';
import {RootState} from '../../redux/store';

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cityName, setCityName] = useState<string>(''); // Default city
  const {weatherData} = useSelector((state: RootState) => state.weather) as {
    weatherData: WeatherData;
  };

  const {isDarkMode, colors} = useTheme();
  const dispatch = useDispatch();
  const themedStyles = styles(colors);

  const loadWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchWeatherData(cityName);

      dispatch(setWeatherData(data));

      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather data');
      setLoading(false);
      Alert.alert('Error', 'Failed to load weather data');
    }
  };

  const handleDarkModeSwitch = () => {
    dispatch(updateTheme());
  };

  const handleCityNameChange = (text: string) => {
    setCityName(text);
  };

  return (
    <SafeAreaView style={themedStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        style={themedStyles.scrollView}
        contentContainerStyle={themedStyles.scrollViewContent}>
        <Header
          colors={colors}
          isDarkMode={isDarkMode}
          title="Weather App"
          toggleSwitch={handleDarkModeSwitch}
        />
        <View style={themedStyles.rowContainer}>
          <TextInput
            placeholder="Search city"
            style={themedStyles.textInput}
            placeholderTextColor={colors.placeholderText}
            onChangeText={handleCityNameChange}
            value={cityName}
          />
          <TouchableOpacity
            onPress={loadWeatherData}
            style={themedStyles.searchBtn}
            disabled={!cityName || loading}>
            <Text style={themedStyles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>
        {!loading && !error && !isEmpty(weatherData) && (
          <>
            <LocationDisplay city={weatherData.location.name} />
            <CurrentWeather
              temperature={weatherData.current.temperature}
              condition={weatherData.current.weather_descriptions[0]}
              minTemp={weatherData.forecast.today.minTemp}
              maxTemp={weatherData.forecast.today.maxTemp}
            />
            <HourlyForecast hourlyData={weatherData.forecast.today.hourly} />
            <WeeklyForecast dailyData={weatherData.forecast.daily} />
          </>
        )}
        {isEmpty(weatherData) && !error && !loading && (
          <EmptyWidget colors={colors} bottomText={'No city data found!'} />
        )}
        {error && !loading && (
          <View style={themedStyles.centered}>
            <Text style={themedStyles.errorText}>
              {error || 'Something went wrong'}
            </Text>
            <TouchableOpacity
              style={themedStyles.retryButton}
              onPress={loadWeatherData}>
              <Text style={themedStyles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
        {loading && (
          <View style={themedStyles.centered}>
            <ActivityIndicator size="large" color={colors.text} />
            <Text style={themedStyles.loadingText}>
              Loading weather data...
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
