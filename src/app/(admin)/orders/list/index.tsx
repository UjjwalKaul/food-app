import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import React, { useEffect } from 'react';
import OrderListItem from '@components/OrderListItem';
import useAdminOrderList from '@/api/orders';
import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useInsertOrderSubscription } from '@/api/orders/subscriptions';

export default function OrdersScreens() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });

  useInsertOrderSubscription();

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
