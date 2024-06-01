import { Spin } from 'antd';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { AuthService } from 'stores';

type AuthenticatedProps = {
  fallback?: ReactNode;
  children?: ReactNode;
};

export const Authenticated = ({ fallback = null, children }: AuthenticatedProps): ReactElement => {
  const [authState, setAuthState] = useState<{ authenticated: boolean }>({ authenticated: false });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const result = await AuthService.instance.checkAuthenticated();
        setAuthState(result);
      } catch {
        setAuthState({ authenticated: false });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <Spin style={{ width: '100%', marginTop: '45vh' }} tip="Loading" size="large">
        <></>
      </Spin>
    );
  }

  if (!authState.authenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
