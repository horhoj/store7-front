import { useThemeSwitch } from '../useThemeSwitch';
import { Button } from '~/ui/Button';

export function ThemeSwitchWidget() {
  const { handleThemeSwitch, isDarkTheme } = useThemeSwitch();
  return (
    <Button onClick={handleThemeSwitch} isIcon={false}>
      {isDarkTheme ? 'Dark' : 'White'}
    </Button>
  );
}
