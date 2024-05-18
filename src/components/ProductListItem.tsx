import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import { Product } from '../types';
import { Link, router } from 'expo-router';

export const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
  product: Product;
};

export default function ProductListItem({ product }: ProductListItemProps) {
  return (
    <Link href={`/${product.id}`}>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price}</Text>
      </Pressable>
    </Link>
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
