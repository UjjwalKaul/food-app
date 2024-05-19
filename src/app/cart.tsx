import { View, FlatList, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@components/CartListItem";

export default function CartScreen() {
  const { items } = useCart();
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => {
          return <CartListItem cartItem={item} />;
        }}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
