import React, { ComponentType, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authProvider } from 'context/authProvider';

interface AuthProps {}

export const withAuth = <P,>(Component: ComponentType<P>): React.FC<P> => {
  return (props: P) => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const handleCheckAuthentication = async () => {
      const { authenticated } = await authProvider.check();
      setIsLoggedIn(authenticated);
    };

    useEffect(() => {
      handleCheckAuthentication();
    }, []);

    if (!isLoggedIn) {
      navigate('/login');
      return null;
    }

    const LogicProps: AuthProps = {};
    return <Component {...props} {...LogicProps} />;
  };
};
