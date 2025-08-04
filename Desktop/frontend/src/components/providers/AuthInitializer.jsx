"use client";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthStatus, setCredentials } from '../../store/slices/authSlice';
import { ADMIN_CONFIG } from '../../lib/adminConfig';

export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is authenticated on app initialization
    const token = localStorage.getItem('authToken');
    const userString = localStorage.getItem('user');
    
    if (token && userString) {
      try {
        const user = JSON.parse(userString);
        
        // Double-check admin status based on email
        const isUserAdmin = ADMIN_CONFIG.isAdmin(user.email);
        const userWithCorrectRole = {
          ...user,
          ...(isUserAdmin ? ADMIN_CONFIG.defaultAdminRole : ADMIN_CONFIG.defaultUserRole)
        };
        
        // Update localStorage if role changed
        if (user.isAdmin !== userWithCorrectRole.isAdmin) {
          localStorage.setItem('user', JSON.stringify(userWithCorrectRole));
        }
        
        // Set credentials from localStorage
        dispatch(setCredentials({ user: userWithCorrectRole, token }));
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        // Clear invalid data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    } else if (token) {
      // If only token exists, try to fetch user data
      dispatch(checkAuthStatus());
    }
  }, [dispatch]);

  return <>{children}</>;
}
