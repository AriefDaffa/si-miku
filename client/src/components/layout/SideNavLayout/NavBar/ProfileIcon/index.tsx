import { useState } from 'react';
import type { FC } from 'react';

import { Avatar, IconButton } from '@mui/material';

const ProfileIcon: FC = () => {
  const [open, setOpen] = useState(null);

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };
  return (
    <IconButton
      onClick={handleOpen}
      sx={{
        p: 0,
        // ...(open && {
        //   '&:before': {
        //     zIndex: 1,
        //     content: "''",
        //     width: '100%',
        //     height: '100%',
        //     borderRadius: '50%',
        //     position: 'absolute',
        //     bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
        //   },
        // }),
      }}
    >
      <Avatar
        src={
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
        alt="photoURL"
      />
    </IconButton>
  );
};

export default ProfileIcon;
