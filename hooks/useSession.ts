'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/axios';


interface User {
  name: string;
  email: string;
  googleId: string | null;
  profilePicture: string | null
  [key: string]: any; // Optional, if the user object has dynamic keys
}

const useSession = () => {
  const [user, setUser] = useState<User | null>(null); // User can be `null` initially
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/api/auth/user', { withCredentials: true });
        if (response?.data?.user) {
          setUser(response.data.user as User); // Ensure it matches the User type
          setLoggedIn(true);
        } else {
          setUser(null);
          setLoggedIn(false);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
        setLoading(false);
        setLoggedIn(false);
      }
    };

    fetchUser();
    return () => setUser(null);
  }, []);

  const logout = async () => {
    try {
      const res = await api.get('/api/auth/logout', { withCredentials: true });
      setUser(null);
      setLoggedIn(false);
      router.push('/auth/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return { user, loading, loggedIn, logout };
};

export default useSession;
