import type { FC, Dispatch, SetStateAction } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Grid as MuiGrid } from '@mui/material';

import Card from '@/components/UI/atoms/Card';
import { GREY, PRIMARY } from '@/presentation/global-component/theme/Colors';
import { Header, SubHeader } from '@/components/UI/atoms/Typography';
import type { IndicatorListDataNormalized } from '@/repository/query/department/DepartmentQuery';

interface DepartmentViewProps {
  currentView: number;
  data: IndicatorListDataNormalized[];
  setCurrentView: Dispatch<SetStateAction<number>>;
}

const DepartmentView: FC<DepartmentViewProps> = (props) => {
  const { data, currentView, setCurrentView } = props;

  const handleChangeView = (id: number) => {
    setCurrentView(id);
  };

  return (
    <Card>
      <Box sx={{ mb: 2 }}>
        <Header text="Filter Departemen" />
        <SubHeader text="Pilih salah satu untuk menampilkan data dari jurusan tersebut" />
      </Box>
      <Box>
        <Stack
          flexDirection="row"
          sx={{ backgroundColor: GREY[300], borderRadius: '15px' }}
        >
          <Box
            sx={{
              p: 1,
              width: '100%',
              textAlign: 'center',
            }}
          >
            <Header text="Teknik Informatika" />
          </Box>
          <Box
            sx={{
              p: 1,
              width: '100%',
              textAlign: 'center',
              borderTopRightRadius: '15px',
              borderBottomRightRadius: '15px',
              backgroundColor: PRIMARY.main,
              color: 'white',
            }}
          >
            <Header text="Sistem Informasi" />
          </Box>
        </Stack>
      </Box>
      {/* <MuiGrid container spacing={1} sx={{ my: 4 }}>
        {data.map((item) => (
          <MuiGrid item sm={6} key={item.departmentID}>
            <Stack
              alignItems="center"
              direction={{ xs: 'column', sm: 'row' }}
              sx={{
                border: `2px solid ${
                  currentView === item.departmentID
                    ? PRIMARY.main
                    : 'rgba(224, 224, 224, 1);'
                }`,
                p: 1,
                borderRadius: 1,
                backgroundColor:
                  currentView === item.departmentID ? PRIMARY.light : '',
                color: currentView === item.departmentID ? 'white' : 'black',
                ':hover':
                  currentView === item.departmentID
                    ? {
                        backgroundColor: PRIMARY.light,
                        cursor: 'pointer',
                      }
                    : {
                        backgroundColor: PRIMARY.light,
                        cursor: 'pointer',
                        color: 'white',
                      },
              }}
              onClick={() => handleChangeView(item.departmentID)}
            >
              <Box sx={{ backgroundColor: 'white', p: 1, borderRadius: 1 }}>
                <Avatar
                  src={item.departmentImage}
                  alt="tif"
                  variant="rounded"
                  sx={{ width: 'fit-content' }}
                />
              </Box>
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
              <Header
                text={`Department ${item.departmentName}`}
                variant="body2"
              />
            </Stack>
          </MuiGrid>
        ))}
      </MuiGrid> */}
    </Card>
  );
};

export default DepartmentView;
