import { NavLink as RouterLink } from 'react-router-dom';
import type { FC } from 'react';

import {
  ListItemButton,
  ListItemText,
  ListItemIcon,
  useTheme,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

import { useSideBar } from '@/controller/context/SideBarContext';

import { navIconCx } from './styles';
import { PRIMARY } from '@/presentation/global-component/theme/Colors';

interface ExpandButtonProps {
  title: string;
  isOpen: boolean;
  path: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  onClickOpen: () => void;
  onCloseNav: () => void;
}

const ExpandButton: FC<ExpandButtonProps> = (props) => {
  const { title, Icon, onClickOpen, isOpen, onCloseNav, path } = props;

  const theme = useTheme();
  const { isMinimized } = useSideBar();

  const handleOnClick = () => {
    onClickOpen();
    onCloseNav();
  };

  return (
    <ListItemButton
      disableGutters
      onClick={handleOnClick}
      component={RouterLink}
      to={path}
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
          color: 'white',
          bgcolor: PRIMARY.main,
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <ListItemIcon css={navIconCx}>
        <Icon />
      </ListItemIcon>
      {!isMinimized && (
        <>
          <ListItemText disableTypography primary={title} />
          {isOpen ? (
            <ExpandLess sx={{ mr: 1 }} />
          ) : (
            <ExpandMore sx={{ mr: 1 }} />
          )}
        </>
      )}
      {/* {isOpen ? <ExpandLess /> : <ExpandMore />} */}
    </ListItemButton>
  );
};

export default ExpandButton;
