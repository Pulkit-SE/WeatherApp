// components/LocationDisplay.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface LocationDisplayProps {
  city: string;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({city}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.cityName}>{city}</Text>
      <Text style={styles.dayLabel}>Today</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  cityName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'System',
  },
  dayLabel: {
    fontSize: 18,
    color: '#999999',
    marginTop: 4,
    fontFamily: 'System',
  },
});

export default LocationDisplay;
