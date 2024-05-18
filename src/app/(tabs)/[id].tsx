import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>ProductDetailScreen for id :{id}</Text>
    </View>
  );
}
