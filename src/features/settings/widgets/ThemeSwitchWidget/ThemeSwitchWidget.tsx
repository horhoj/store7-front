import { settingsSlice } from '../../store/settingsSlice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { Button } from '~/ui/Button';

export function ThemeSwitchWidget() {
  const dispatch = useAppDispatch();

  const isDarkTheme = useAppSelector((state) => state.settings.isDarkTheme);

  const handleThemeSwitch = () => {
    dispatch(settingsSlice.actions.themeToggle());
  };

  return (
    <Button onClick={handleThemeSwitch} isIcon={false}>
      {isDarkTheme ? 'D' : 'W'}
    </Button>
  );
}
