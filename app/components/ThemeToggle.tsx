import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeToggle({
  onClick,
  sx,
  ...props
}: IconButtonProps) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <IconButton
        size="sm"
        variant="outlined"
        color="neutral"
        {...props}
        sx={sx}
        disabled
      />
    );
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      {...props}
      onClick={(event) => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
        onClick?.(event);
      }}
      sx={[
        {
          '& > *:first-child': {
            display: mode === 'dark' ? 'none' : 'initial',
          },
          '& > *:last-child': {
            display: mode === 'light' ? 'none' : 'initial',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <FaMoon />
      <FaSun />
      {/* <i data-feather="moon" />
      <i data-feather="sun" /> */}
    </IconButton>
  );
}
