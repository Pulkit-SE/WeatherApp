import React from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import isEmpty from 'lodash.isempty';

import Header from '../../components/header';
import CityWeatherCard from './cityWeatherCard';
import EmptyWidget from './emptyWidget';

import {updateTheme} from '../../redux/actions/userActions';
import {useTheme} from '../../utils/hooks/useTheme';
import {styles} from './styles';
import weatherApi from '../../utils/api';
import {setWeatherData} from '../../redux/actions/weatherActions';
import { RootState } from '../../redux/store';
import { TWeatherCard } from '../../utils/types/weathers';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {weatherData} = useSelector((state: RootState) => state.weather);
  const {isDarkMode, colors} = useTheme();

  const [cityName, setCityName] = React.useState('');
  const [isNoDataFound, setIsNoDataFound] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const themedStyles = styles(colors);

  const handleDarkModeSwitch = () => {
    dispatch(updateTheme());
  };

  const handleCityNameChange = (text: string) => {
    setCityName(text);
  };

  const handleSearchPress = async () => {
    setIsLoading(true);
    const weatherResponse = await weatherApi.getCurrentWeather(cityName);

    if (weatherResponse?.success === false) {
      setIsNoDataFound(true);
      setIsLoading(false);
      return;
    }

    const data = {
      cityName: `${weatherResponse?.location?.name}, ${weatherResponse?.location?.country}`,
      temperature: weatherResponse?.current?.temperature,
      weatherType: weatherResponse?.current?.weather_descriptions[0],
    };

    setIsNoDataFound(false);
    dispatch(setWeatherData(data));
    setIsLoading(false);
  };

  const RenderWeatherCard = () => {
    return isLoading ? (
      <View style={themedStyles.activity}>
        <ActivityIndicator size={'large'} />
      </View>
    ) : !isEmpty(weatherData) && !isNoDataFound ? (
      <CityWeatherCard data={weatherData as TWeatherCard} colors={colors} />
    ) : isNoDataFound ? (
      <EmptyWidget colors={colors} bottomText={'No city data found!'} />
    ) : (
      <EmptyWidget colors={colors} bottomText={'Search city...'} />
    );
  };

  return (
    <View style={themedStyles.container}>
      <Header
        isDarkMode={isDarkMode}
        toggleSwitch={handleDarkModeSwitch}
        title="Weather App"
        colors={colors}
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
          onPress={handleSearchPress}
          style={themedStyles.searchBtn}
          disabled={!cityName || isLoading}>
          <Text style={themedStyles.searchText}>Search</Text>
        </TouchableOpacity>
      </View>
      <RenderWeatherCard />
    </View>
  );
};

export default HomeScreen;
