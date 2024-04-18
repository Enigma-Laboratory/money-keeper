import { FC, PropsWithChildren } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

const MapWrapper: FC<PropsWithChildren<any>> = () => {
  return (
    <Wrapper version="beta" libraries={['marker']} apiKey={''}>
      {/* <MapComponent {...mapProps}>{children}</MapComponent> */}
    </Wrapper>
  );
};

export default MapWrapper;
