import _ from 'lodash';
import { useEffect, useState } from 'react';
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handler = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    const debouce = _.debounce(handler, 100, { maxWait: 1000 });
    window.addEventListener('resize', debouce);

    return () => {
      window.removeEventListener('resize', debouce);
    };
  }, []);
  return { width: windowSize.width, height: windowSize.height };
};
