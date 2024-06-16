import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

export default function useAdminOrderList({ archived = false }) {
  const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering'];
  return useQuery({
    queryKey: ['orders', { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .in('status', statuses);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
}

export function useMyOrderList() {
  const { session } = useAuth();
  const id = session?.user.id;
  return useQuery({
    queryKey: ['orders', { userId: id }],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', id);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
}
