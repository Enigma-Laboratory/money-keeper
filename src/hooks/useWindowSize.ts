import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { EventAction } from 'utils';

const DELAY_MS = 100;
const MAX_WAIT_MS = 1000;

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
    const debouncedHandler = debounce(handler, DELAY_MS, { maxWait: MAX_WAIT_MS });
    EventAction.on('resize', debouncedHandler);

    return () => {
      EventAction.remove('resize', debouncedHandler);
    };
  }, []);
  return { width: windowSize.width, height: windowSize.height };
};
