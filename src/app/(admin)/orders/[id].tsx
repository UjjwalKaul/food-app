import orders from '@assets/data/orders';
import OrderItemListItem from '@components/OrderItemListItem';
import OrderListItem from '@components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Colors from '@/constants/Colors';
import { OrderStatusList } from '@/types';
import { useOrderDetails } from '@/api/orders';

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  if (!idString) {
    return <Text>Product ID is missing</Text>;
  }
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || !order) {
    return <Text>Failed to fetch products</Text>;
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
        ListFooterComponent={() => {
          return (
            <>
              <Text style={{ fontWeight: 'bold' }}>Status</Text>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                {OrderStatusList.map((status) => (
                  <Pressable
                    key={status}
                    onPress={() => console.warn('Update status')}
                    style={{
                      borderColor: Colors.light.tint,
                      borderWidth: 1,
                      padding: 10,
                      borderRadius: 5,
                      marginVertical: 10,
                      backgroundColor:
                        order.status === status
                          ? Colors.light.tint
                          : 'transparent',
                    }}>
                    <Text
                      style={{
                        color:
                          order.status === status ? 'white' : Colors.light.tint,
                      }}>
                      {status}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </>
          );
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
