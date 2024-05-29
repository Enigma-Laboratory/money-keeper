import { User } from '@enigma-laboratory/shared';
import { useLocalStorage } from 'hooks';
import { ComponentType } from 'react';
import { USER_IDENTITY } from 'utils';

export interface ProfileProps {
  data: { isLoading: boolean; user: Pick<User, '_id' | 'name'> };
  dispatch?: object;
}

export const withProfileController = <P,>(Component: ComponentType<P>): ComponentType<P> => {
  return (props: P) => {
    // const { isLoading, operationalSettings, orders } = useFetchInitData();
    const [user] = useLocalStorage<Pick<User, '_id' | 'name'>>(USER_IDENTITY, {
      _id: '',
      name: '',
    });

    const logicProps: ProfileProps = {
      data: { isLoading: false, user },
      dispatch: {},
    };
    return <Component {...props} {...logicProps} />;
  };
};
