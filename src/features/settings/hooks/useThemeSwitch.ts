import { useEffect, useState } from 'react';
import { useAppSelector } from '~/store/hooks';

export const useThemeSwitch = () => {
  const isDarkTheme = useAppSelector((state) => state.settings.isDarkTheme);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkTheme]);
};
