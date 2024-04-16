import { authProvider } from 'context/authProvider';
import React from 'react';
import { useEffect, useState } from 'react';

export const LegacyAuthContext = React.createContext<any>({});

export const useIsAuthenticated = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const handleCheckAuthentication = async () => {
    const { authenticated } = await authProvider.check();
    setIsLoggedIn(authenticated);
  };

  useEffect(() => {
    handleCheckAuthentication();
  }, [isLoggedIn]);
  return isLoggedIn;
};
