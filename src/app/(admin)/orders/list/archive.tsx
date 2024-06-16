import { FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import React from 'react';
import orders from '@assets/data/orders';
import OrderListItem from '@components/OrderListItem';
import useAdminOrderList from '@/api/products/orders';
export default function OrdersScreens() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: true });
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }
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
