import React, { ReactElement, ReactNode } from 'react';

type AuthenticatedProps = {
  key: React.Key;
  fallback?: ReactNode;
  redirectOnFail?: string | true;
  loading?: ReactNode;
  children?: ReactNode;
};

export const Authenticated = (props: AuthenticatedProps): ReactElement => {
  const { children } = props;

  return <>{children}</>;
};
