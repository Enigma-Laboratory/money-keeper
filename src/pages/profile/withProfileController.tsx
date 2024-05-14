import { User } from '@enigma-laboratory/shared';
import { useFetchInitData, useLocalStorage } from 'hooks';
import { ComponentType } from 'react';
import { USER_IDENTITY } from 'utils';

export interface ProfileProps {
  data: { isLoading: boolean; user: User };
  dispatch?: {};
}

export const withProfileController = <P,>(Component: ComponentType<P>): ComponentType<P> => {
  return (props: P) => {
    const { isLoading, operationalSettings, orders } = useFetchInitData();
    const [user] = useLocalStorage<User>(USER_IDENTITY);

    const logicProps: ProfileProps = {
      data: { isLoading: false, user },
      dispatch: {},
    };
    return <Component {...props} {...logicProps} />;
  };
};
