import { useEffect, useState } from 'react';

const LS_KEY_IS_DARK_THEME = 'LS_KEY_IS_DARK_THEME';

export const useThemeSwitch = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const runSideEffect = (isDark: boolean) => {
    if (isDark) {
      document.body.classList.add('dark');
      localStorage.setItem(LS_KEY_IS_DARK_THEME, 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem(LS_KEY_IS_DARK_THEME, 'false');
    }
  };

  useEffect(() => {
    const value = localStorage.getItem(LS_KEY_IS_DARK_THEME) === 'true';
    runSideEffect(value);
    setIsDarkTheme(value);
  }, []);

  const handleThemeSwitch = () => {
    setIsDarkTheme((prev) => {
      const value = !prev;
      runSideEffect(value);
      return value;
    });
  };

  return { isDarkTheme, handleThemeSwitch };
};
