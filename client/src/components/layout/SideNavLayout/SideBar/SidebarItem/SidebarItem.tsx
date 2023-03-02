import { NavLink as RouterLink } from 'react-router-dom';
import type { FC } from 'react';

import {
  ListItemButton,
  ListItemText,
  ListItemIcon,
  useTheme,
} from '@mui/material';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

import { useSideBar } from '@/context/SideBarContext';

import { navIconCx } from './styles';

interface SidebarItemProps {
  title: string;
  path: string;
  onCloseNav: () => void;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}

const SidebarItem: FC<SidebarItemProps> = (props) => {
  const { path, title, Icon, onCloseNav } = props;

  const theme = useTheme();
  const { isMinimized } = useSideBar();

  return (
    <ListItemButton
      disableGutters
      component={RouterLink}
      to={path}
      onClick={onCloseNav}
      sx={{
        ...theme.typography.body2,
        height: 48,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        textTransform: 'capitalize',
        color: theme.palette.text.secondary,
        borderRadius: 1,

        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <ListItemIcon css={navIconCx}>
        <Icon />
      </ListItemIcon>
      {!isMinimized && <ListItemText disableTypography primary={title} />}
    </ListItemButton>
  );
};

export default SidebarItem;
