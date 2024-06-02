import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import orders from '@assets/data/orders';
import OrderListItem from '@components/OrderListItem';

export default function OrdersScreens() {
  return (
    <FlatList
      style={styles.container}
      data={orders}
      renderItem={({ item }) => {
        return <OrderListItem order={item} />;
      }}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gainsboro',
  },
});
