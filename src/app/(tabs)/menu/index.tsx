import { FlatList, Platform } from "react-native";
import products from "@assets/data/products";
import ProductListItem from "@components/ProductListItem";
import React from "react";
import { StatusBar } from "expo-status-bar";

export default function TabOneScreen() {
  return (
    <>
      <FlatList
        data={products}
        renderItem={({ item }) => {
          return <ProductListItem product={item} />;
        }}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
      <StatusBar style={Platform.OS === "ios" ? "dark" : "auto"} />
    </>
  );
}
