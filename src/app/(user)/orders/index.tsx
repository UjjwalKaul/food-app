import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import orders from '@assets/data/orders';
import OrderListItem from '@components/OrderListItem';

export default function OrdersScreens() {
  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={({ item }) => {
          return <OrderListItem order={item} />;
        }}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gainsboro',
  },
});
