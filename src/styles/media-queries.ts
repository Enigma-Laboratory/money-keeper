import { FlattenSimpleInterpolation, css } from 'styled-components';

const size = {
  mobile: '576px',
  tablet: '768px',
  laptop: '992px',
  desktop: '1200px',
};

export const mobile = (inner: FlattenSimpleInterpolation) => css`
  @media (max-width: ${size.mobile}) {
    ${inner};
  }
`;
export const tablet = (inner: FlattenSimpleInterpolation) => css`
  @media (max-width: ${size.tablet}) {
    ${inner};
  }
`;
export const laptop = (inner: FlattenSimpleInterpolation) => css`
  @media (max-width: ${size.laptop}) {
    ${inner};
  }
`;
export const desktop = (inner: FlattenSimpleInterpolation) => css`
  @media (max-width: ${size.desktop}) {
    ${inner};
  }
`;
