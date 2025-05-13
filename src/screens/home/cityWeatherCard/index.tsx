import React, {useCallback, useMemo} from 'react';
import {Image, Platform, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {styles} from './styles';
import {WEATHERS} from '../../../utils/constants/weathers';
import {TCityWeatherCard} from '../../../utils/types/weathers';

const CityWeatherCard = ({data, colors}: TCityWeatherCard) => {
  const themedStyles = styles(colors);

  const getDate = useCallback(() => {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;
  }, []);

  const weatherImage = useMemo(() => {
    switch (data?.weatherType) {
      case 'Sunny':
        return WEATHERS.SUNNY;
      case 'Haze':
        return WEATHERS.WINDY;
      case 'Overcast':
        return WEATHERS.CLOUDY;
      default:
        return WEATHERS.WINDY;
    }
  }, [data?.weatherType]);

  return (
    <View style={themedStyles.container}>
      <View style={themedStyles.parentContainer}>
        <Text style={themedStyles.cityText} numberOfLines={1}>
          {data?.cityName}
        </Text>
        <View style={themedStyles.secondRow}>
          <View>
            <Text style={themedStyles.timeText}>{getDate()}</Text>
            <View style={themedStyles.degreeContainer}>
              <Text style={themedStyles.tempText}>{data?.temperature}</Text>
              <Text style={themedStyles.unitText}>° C</Text>
            </View>
            <Text style={themedStyles.weatherText} numberOfLines={1}>{data?.weatherType}</Text>
          </View>
          {Platform.OS === 'android' ? (
            <FastImage
              source={{
                uri: weatherImage,
              }}
              style={themedStyles.imgStyle}
            />
          ) : (
            <Image
              source={{
                uri: weatherImage,
              }}
              style={themedStyles.imgStyle}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default CityWeatherCard;
