import { View, Text, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useCart } from "@/providers/CartProvider";
export default function CartScreen() {
  const { items } = useCart();
  return (
    <View>
      <Text>Cart items length:{items.length}</Text>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
