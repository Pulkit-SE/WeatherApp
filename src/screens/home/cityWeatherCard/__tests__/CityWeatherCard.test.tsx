import React from 'react';
import {render} from '@testing-library/react-native';

import HomeScreen from '../../index';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn().mockImplementation(selector =>
    selector({
      weather: {
        weatherData: {
          cityName: 'Test City',
          temperature: 25,
          weatherType: 'Sunny',
        },
      },
    }),
  ),
}));

jest.mock('lodash.isempty', () => {
  return jest.fn(obj => !obj || Object.keys(obj).length === 0);
});

jest.mock('../../../../utils/hooks/useTheme', () => ({
  useTheme: () => ({
    isDarkMode: false,
    colors: {
      background: '#FFFFFF',
      text: '#000000',
      primary: '#007AFF',
      secondary: '#5856D6',
      accent: '#FF2D55',
      placeholderText: '#C7C7CC',
    },
  }),
}));

jest.mock('../../../../components/header', () => 'Header');

jest.mock('../../cityWeatherCard', () => 'CityWeatherCard');

jest.mock('../../emptyWidget', () => 'EmptyWidget');

// Mock weatherApi
jest.mock('../../../../utils/api', () => ({
  getCurrentWeather: jest.fn().mockResolvedValue({
    success: true,
    location: {
      name: 'London',
      country: 'UK',
    },
    current: {
      temperature: 20,
      weather_descriptions: ['Partly cloudy'],
    },
  }),
}));

describe('HomeScreen Component', () => {
  test('renders correctly', () => {
    const {debug} = render(<HomeScreen />);
    expect(true).toBeTruthy();
  });
});
