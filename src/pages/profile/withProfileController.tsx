import { User } from '@enigma-laboratory/shared';
import { ComponentType } from 'react';
import { AuthService } from 'stores';

export interface ProfileProps {
  data: { isLoading: boolean; user: Pick<User, '_id' | 'name'> };
  dispatch?: object;
}

export const withProfileController = <P,>(Component: ComponentType<P>): ComponentType<P> => {
  return (props: P) => {
    const user = AuthService.instance.getAuth();

    const logicProps: ProfileProps = {
      data: { isLoading: false, user },
      dispatch: {},
    };
    return <Component {...props} {...logicProps} />;
  };
};
