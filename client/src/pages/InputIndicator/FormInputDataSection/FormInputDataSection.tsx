import { useFieldArray, useForm } from 'react-hook-form';
import { split } from 'lodash';
import { useState } from 'react';
import type { FC } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';

import CustomCard from '@/components/UI/CustomCard';
import CustomGrid from '@/components/UI/CustomGrid';
import LoadingPopup from '@/components/UI/Loader/LoadingPopup';
import DialogPopup from '@/components/UI/DialogPopup';
import useMajorQuery from '@/repository/query/MajorQuery';
import { Header, SubHeader } from '@/components/UI/Typography';
import { SelectInput, TextInput } from '@/components/UI/Input';

import AutocompleteInput from './AutocompleteInput';
import JurusanCardInput from './JurusanCardInput';
import { defaultValues } from './constant';
import type { DefaultValueTypes } from './types';
import DropdownDialog from './DropdownDialog';

// @TODO: ADD section data input
const FormInputDataSection: FC = () => {
  const [openLoading, setOpenLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const { control, handleSubmit, getValues } = useForm({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'indicator_data',
  });

  const { data: major, isLoading: isMajorLoading } = useMajorQuery();

  //   const handleOnSubmit = (data: DefaultValueTypes) => {
  const handleOnSubmit = (data: any) => {
    setOpenLoading(true);

    // mutate(
    //   {
    //     indicator: data.indicator.map((item) => {
    //       return {
    //         indicator_code: split(item.indicator_code, '.')
    //           .filter((n) => n !== ' ')
    //           .join('.'),
    //         indicator_name: item.indicator_name,
    //       };
    //     }),
    //   },
    //   {
    //     onSuccess: () => {
    //       setOpenLoading(false), setOpenDialog(true);
    //     },
    //     onError: () => setOpenLoading(false),
    //   }
    // );
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  // Dropdown handler
  const openSectionModal = () => {
    setOpenDropdown(true);
  };

  const closeSectionModal = () => {
    setOpenDropdown(false);
  };

  const addSection = () => {
    // append({});
  };

  return (
    <CustomGrid
      gridItem={[
        <CustomCard>
          <Header text="Form Input" />
          <SubHeader text="Input data indikator yang terdapat pada sistem melalui form dibawah ini" />
          <Divider sx={{ mt: 2, mb: 2 }} />
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <CustomGrid
              sx={{ mb: 2 }}
              spacing={1}
              gridItem={[
                <AutocompleteInput control={control} />,
                <CustomGrid
                  sx={{ mb: 2, mt: 2 }}
                  //   sm={[6]}
                  spacing={1}
                  gridItem={[
                    isMajorLoading ? (
                      <Skeleton />
                    ) : (
                      fields.map((item, idx) => (
                        <Box key={item.id}>
                          <Stack
                            flexDirection="row"
                            justifyContent="space-between"
                          >
                            <Header
                              text={`Data indikator jurusan ${
                                major[idx].majorName || ''
                              }`}
                              variant="subtitle1"
                            />
                            <IconButton
                              onClick={() => remove(idx)}
                              sx={{ padding: 0 }}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Stack>
                        </Box>
                      ))
                    ),
                  ]}
                />,
                // <Button
                //   onClick={openSectionModal}
                //   variant="outlined"
                //   // disable={isMajorLoading}
                //   fullWidth
                // >
                //   Tambah section jurusan
                // </Button>,
              ]}
            />
            <Button
              color="primary"
              size="large"
              type="submit"
              variant="contained"
              //   disabled={isLoading}
              sx={{ float: 'right' }}
            >
              {/* {isLoading ? 'Loading...' : 'Submit'} */}
            </Button>
            <DropdownDialog
              open={openDropdown}
              handleClose={closeSectionModal}
              major={major}
            />
          </form>
          <DialogPopup
            title="Success!"
            bodyText="Indikator berhasil dibuat"
            buttonText=""
            handleClose={closeDialog}
            handleAccept={closeDialog}
            open={openDialog}
          />
          <LoadingPopup open={openLoading} />
        </CustomCard>,
      ]}
    />
  );
};

export default FormInputDataSection;
