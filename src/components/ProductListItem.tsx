import { Image, Text, StyleSheet, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import { Product, Tables } from '../types';
import { router, useSegments } from 'expo-router';
import React from 'react';

export const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
  product: Tables<'products'>;
};

export default function ProductListItem({ product }: ProductListItemProps) {
  const segments = useSegments();
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        router.push(`/${segments[0]}/menu/${product.id}`);
      }}>
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>₹{product.price}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    maxWidth: '50%',
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});
