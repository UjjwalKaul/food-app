import { View, FlatList } from "react-native";
import products from "@assets/data/products";
import ProductListItem from "@components/ProductListItem";
import React from "react";

export default function TabOneScreen() {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => {
        return <ProductListItem product={item} />;
      }}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}