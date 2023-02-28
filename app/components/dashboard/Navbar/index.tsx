'use client';

import { ClickAwayListener, PopperUnstyled } from '@mui/base';
import { Box, MenuItem, MenuList, Sheet, styled, Typography } from '@mui/joy';
import { THEME } from 'constants/ui';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  FaAd,
  FaArrowDown,
  FaChartArea,
  FaChevronDown,
  FaGrav,
  FaHome,
  FaList,
  FaUser,
} from 'react-icons/fa';
import ThemeToggle from '../../ThemeToggle';

const Popup = styled(PopperUnstyled)({
  zIndex: 1000,
});

const MenuLink = ({
  link,
  label,
  icon,
}: {
  link: string;
  label: string;
  icon?: any;
}) => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleListKeyDown = (event: any) => {
    if (event.key === 'Tab') {
      setAnchorEl(null);
    } else if (event.key === 'Escape') {
      anchorEl.focus();
      setAnchorEl(null);
    }
  };

  return (
    <>
      <Box
        component={Link}
        onClick={handleClick}
        href={link}
        sx={(theme) => ({
          color: theme.palette.text.secondary,
          textDecoration: 'none',
          minHeight: 42,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          borderRadius: 12,
          transition: 'all .2s',
          background: open ? theme.palette.background.level1 : 'transparent',
          ':hover': {
            background: theme.palette.background.level1,
          },
        })}
      >
        <div className="mr-2">{icon}</div>
        <Typography fontSize="sm">{label}</Typography>
      </Box>

      <Popup
        role={undefined}
        id="composition-menu"
        open={open}
        anchorEl={anchorEl}
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 10],
            },
          },
        ]}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList
            variant="solid"
            // onKeyDown={handleListKeyDown}
            sx={{ boxShadow: 'md', bgcolor: 'background.body' }}
            size="md"
          >
            <MenuItem onClick={handleClose}>
              <Typography fontSize="sm"> Single </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography fontSize="sm"> Single Double </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography fontSize="sm"> Demo </Typography>
            </MenuItem>
          </MenuList>
        </ClickAwayListener>
      </Popup>
    </>
  );
};

export default function Navbar() {
  return (
    <>
      <Sheet
        sx={(theme) => ({
          height: THEME.navbarHeight,
          position: 'sticky',
          top: 0,
          display: 'flex',
          alignItems: 'center',
          //   background: theme.palette.neutral.outlinedBorder,
          background: theme.palette.background.body,
        })}
      >
        <div>
          <Typography>Your GPT</Typography>
        </div>

        <div className="flex flex-1 items-center justify-center gap-2 pr-12">
          <MenuLink label="Home" link="/dashboard/home" icon={<FaUser />} />
          <MenuLink
            label="Dashboard"
            link="/dashboard/home"
            icon={<FaGrav />}
          />
          <MenuLink label="Tools" link="/dashboard/home" icon={<FaList />} />
          <MenuLink
            label="Blogs"
            link="/dashboard/home"
            icon={<FaChartArea />}
          />

          <div className="">
            <ThemeToggle />
          </div>
        </div>
      </Sheet>
    </>
  );
}
