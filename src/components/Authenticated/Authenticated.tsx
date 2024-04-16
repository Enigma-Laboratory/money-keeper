import React, { ReactElement, ReactNode } from 'react';

type AuthenticatedProps = {
  key: React.Key;
  fallback?: ReactNode;
  isLoggedIn?: boolean;
  loading?: ReactNode;
  children?: ReactNode;
};

export const Authenticated = (props: AuthenticatedProps): ReactElement => {
  const { children, isLoggedIn, fallback } = props;

  if (!isLoggedIn) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
