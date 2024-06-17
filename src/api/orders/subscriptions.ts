import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useInsertOrderSubscription() {
  const queryClient = useQueryClient();
  useEffect(() => {
    const ordersSubcription = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          console.log('Change received!', payload);
          queryClient.invalidateQueries({ queryKey: ['orders'] });
        }
      )
      .subscribe();
    return () => {
      ordersSubcription.unsubscribe();
    };
  }, []);
}

export function useUpdateOrderSubscription() {}
