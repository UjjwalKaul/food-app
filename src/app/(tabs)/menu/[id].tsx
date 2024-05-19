import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@components/ProductListItem";
import Button from "@components/Button";

const sizes = ["S", "M", "L", "XL"];

export default function ProductDetailScreen() {
  const [selectedSize, setSelectedSize] = useState("M");
  const { id } = useLocalSearchParams();
  const product = products.find((p) => {
    return p.id.toString() === id;
  });
  if (!product) {
    return <Text>Product not found</Text>;
  }

  function AddToCart() {
    console.log("Added to cart");
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        style={styles.image}
        source={{ uri: product.image || defaultPizzaImage }}
      />
      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => {
          return (
            <Pressable
              onPress={() => {
                setSelectedSize(size);
              }}
              style={[
                styles.size,
                {
                  backgroundColor:
                    selectedSize === size ? "gainsboro" : "white",
                },
              ]}
              key={size}
            >
              <Text
                style={[
                  styles.sizeText,
                  {
                    color: selectedSize === size ? "black" : "grey",
                  },
                ]}
              >
                {size}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.price}>Price: ₹{product.price}</Text>
      <Button text="Add to cart" onPress={AddToCart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    marginTop: "auto",
    fontSize: 18,
    fontWeight: "bold",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontWeight: 700,
    fontSize: 20,
  },
});
