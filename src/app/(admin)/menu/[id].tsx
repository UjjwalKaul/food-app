import { Stack, useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import products from '@assets/data/products';
import { defaultPizzaImage } from '@/components/ProductListItem';
import React from 'react';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useProduct } from '@/api/products';
import RemoteImage from '@components/RemoteImage';
const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  if (!idString) {
    return <Text>Product ID is missing</Text>;
  }
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
  const { data: product, error, isLoading } = useProduct(id);
  // const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return <Text>Product not found</Text>;
  }
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch products</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen options={{ title: product.name }} />

      <RemoteImage
        path={product.image}
        fallback={defaultPizzaImage}
        style={styles.image}
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>₹{product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ProductDetailsScreen;
