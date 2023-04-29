import { NavLink as RouterLink } from 'react-router-dom';
import type { FC } from 'react';

import {
  ListItemButton,
  ListItemText,
  ListItemIcon,
  useTheme,
  Box,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

import { useSideBar } from '@/controller/context/SideBarContext';

import { navIconCx } from './styles';
import { GREY, PRIMARY } from '@/presentation/global-component/theme/Colors';

interface SidebarItemProps {
  title: string;
  path: string;
  onCloseNav: () => void;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> | '';
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
        my: 0.5,

        '&.active': {
          color: 'white',
          bgcolor: PRIMARY.main,
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      {Icon === '' ? (
        <ListItemIcon css={navIconCx}>
          <FiberManualRecordIcon sx={{ fontSize: '10px' }} />
        </ListItemIcon>
      ) : (
        <ListItemIcon css={navIconCx}>
          <Icon />
        </ListItemIcon>
      )}
      {!isMinimized && <ListItemText disableTypography primary={title} />}
    </ListItemButton>
  );
};

export default SidebarItem;
