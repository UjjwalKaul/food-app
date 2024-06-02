import orders from '@assets/data/orders';
import OrderItemListItem from '@components/OrderItemListItem';
import OrderListItem from '@components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();
  const order = orders.find((o) => {
    return o.id.toString() === id;
  });
  if (!order) {
    return <Text>Not found</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${id}` }} />
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => {
          return <OrderItemListItem item={item} />;
        }}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => {
          return <OrderListItem order={order} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: 'gainsboro',
    gap: 20,
  },
});
