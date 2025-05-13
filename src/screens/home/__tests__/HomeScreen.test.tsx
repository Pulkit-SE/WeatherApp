import React from 'react';
import {render} from '@testing-library/react-native';
import HomeScreen from '../index'; 

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: () => ({weatherData: {}}),
}));

jest.mock('../../../utils/hooks/useTheme', () => ({
  useTheme: () => ({
    isDarkMode: false,
    colors: {
      background: '#FFFFFF',
      text: '#000000',
      primary: '#007AFF',
    },
  }),
}));

jest.mock('lodash.isempty', () => jest.fn(() => true));
jest.mock('../../../components/header', () => 'Header');
jest.mock('../cityWeatherCard', () => 'CityWeatherCard');
jest.mock('../emptyWidget', () => 'EmptyWidget');
jest.mock('../../../utils/api', () => ({
  getCurrentWeather: jest.fn(),
}));

describe('HomeScreen', () => {
  test('renders without crashing', () => {
    render(<HomeScreen />);
    expect(true).toBeTruthy();
  });
});
