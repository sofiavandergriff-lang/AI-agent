import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    email: session.user.email,
                });
            }
            setLoading(false);
        });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    email: session.user.email,
                });
            }
            else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => subscription?.unsubscribe();
    }, []);
    const signUp = async (email, password) => {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error)
            throw error;
    };
    const signIn = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error)
            throw error;
    };
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error)
            throw error;
    };
    return { user, loading, signUp, signIn, signOut };
}
