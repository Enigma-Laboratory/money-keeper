import { ComponentType } from "react";

export interface HomeScreenProps {
  data: {};
  dispatch: {
    onFetchUser?: () => Promise<void>;
  };
}

export const withHomeScreenController = <P,>(
  Component: ComponentType<P>
): ComponentType<P> => {
  return (props: P) => {
    const LogicProps: HomeScreenProps = {
      data: {},
      dispatch: {},
    };
    return <Component {...props} {...LogicProps} />;
  };
};
