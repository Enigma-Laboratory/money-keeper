import { authProvider } from 'context';
import React, { ReactElement, ReactNode, useMemo } from 'react';

type AuthenticatedProps = {
  key: React.Key;
  fallback?: ReactNode;
  loading?: ReactNode;
  children?: ReactNode;
};

export const Authenticated = (props: AuthenticatedProps): ReactElement => {
  console.log('authen');
  const { children, fallback } = props;
  const { authenticated } = useMemo(() => authProvider.check(), []);

  if (!authenticated) return <>{fallback}</>;
  return <>{children}</>;
};
