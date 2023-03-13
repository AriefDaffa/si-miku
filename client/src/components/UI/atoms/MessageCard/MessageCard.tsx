import type { FC, ReactNode } from 'react';

import Box from '@mui/material/Box';

import { Header } from '../Typography';

interface MessageCardProps {
  color: string;
  message: string;
}

const MessageCard: FC<MessageCardProps> = (props) => {
  const { message, color } = props;

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 1,
        border: `2px dashed ${color}`,
      }}
    >
      <Header text={message} variant="subtitle1" sx={{ color: color }} />
    </Box>
  );
};

export default MessageCard;
