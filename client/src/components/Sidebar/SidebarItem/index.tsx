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

import { navIconCx } from './styles';

interface SidebarItemProps {
  title: string;
  path: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}

const SidebarItem: FC<SidebarItemProps> = (props) => {
  const { path, title, Icon } = props;

  const theme = useTheme();

  return (
    <ListItemButton
      disableGutters
      component={RouterLink}
      to={path}
      // @TODO add onClick = close
      sx={{
        ...theme.typography.body2,
        height: 48,
        position: 'relative',
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
      <ListItemText disableTypography primary={title} />
    </ListItemButton>
  );
};

export default SidebarItem;
