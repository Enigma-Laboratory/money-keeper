import { Wrapper } from '@googlemaps/react-wrapper';
import { FC, PropsWithChildren } from 'react';

const MapWrapper: FC<PropsWithChildren> = () => {
  return (
    <Wrapper version="beta" libraries={['marker']} apiKey={''}>
      {/* <MapComponent {...mapProps}>{children}</MapComponent> */}
    </Wrapper>
  );
};

export default MapWrapper;
