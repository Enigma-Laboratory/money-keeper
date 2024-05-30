import { Languages, Mode, useConfigProvider } from 'contexts';
import { useEffect } from 'react';

export const useKeyboardShortcut = () => {
  const toggleTheme = (params?: { character: string }) => {
    const character = params?.character || '`';
    const { mode, setMode } = useConfigProvider();

    useEffect(() => {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === character) {
          setMode(mode === Mode.LIGHT ? Mode.DARK : Mode.LIGHT);
        }
      };
      document.addEventListener('keypress', handleKeyPress);
      return () => {
        document.removeEventListener('keypress', handleKeyPress);
      };
    }, [mode]);
  };

  const toggleLanguage = (params?: { character: string }) => {
    const character = params?.character || '`';
    const { locate, setLocate } = useConfigProvider();

    useEffect(() => {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === character) {
          setLocate((prev) => (prev === Languages.VI ? Languages.EN : Languages.VI));
        }
      };
      document.addEventListener('keypress', handleKeyPress);
      return () => {
        document.removeEventListener('keypress', handleKeyPress);
      };
    }, [locate]);
  };

  return { toggleLanguage, toggleTheme };
};
