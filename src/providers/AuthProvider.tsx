import React, {
  createContext,
  useEffect,
  PropsWithChildren,
  useState,
  useContext,
} from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

type AuthData = {
  session: Session | null;
  loading: boolean;
};
const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
});

export default function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchSession() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    }
    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
