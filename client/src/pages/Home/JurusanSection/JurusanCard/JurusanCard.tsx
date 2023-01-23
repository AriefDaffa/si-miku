import type { FC } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

import { Header } from '@/components/Typography';
import CustomCard from '@/components/CustomCard';
import CustomGrid from '@/components/CustomGrid';

import tifLogo from '@/assets/logo-jurusan/tif-logo.png';

interface JurusanCardProps {}

const JurusanCard: FC<JurusanCardProps> = () => {
  return (
    <CustomCard>
      <Stack flexDirection="row" alignItems="center">
        <Avatar src={tifLogo} alt="tif" variant="rounded" />
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
        <Header text="Teknik Informatika" variant="h6" />
      </Stack>
      <Box
        sx={{
          p: 1,
          mt: 2,
        }}
      >
        <CustomGrid
          sm={[4, 8]}
          gridItem={[
            <List
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="70" secondary="Total Indikator" />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="17"
                  secondary="Indikator memenuhi target"
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <BeachAccessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="20"
                  secondary="Indikator belum memenuhi target"
                />
              </ListItem>
            </List>,
            <CustomCard>123</CustomCard>,
          ]}
        />
      </Box>
    </CustomCard>
  );
};

export default JurusanCard;
