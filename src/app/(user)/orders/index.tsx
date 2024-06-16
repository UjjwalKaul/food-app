import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import OrderListItem from '@components/OrderListItem';
import { useMyOrderList } from '@/api/products/orders';

export default function OrdersScreens() {
  const { data: orders, isLoading, error } = useMyOrderList();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }
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
