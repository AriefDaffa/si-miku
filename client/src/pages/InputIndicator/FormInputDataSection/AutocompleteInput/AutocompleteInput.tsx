import { useFieldArray, useForm } from 'react-hook-form';
import { split } from 'lodash';
import { useState } from 'react';
import type { Control } from 'react-hook-form';
import type { FC } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import useIndicatorQuery from '@/repository/query/IndicatorQuery/useIndicatorQuery';

interface AutocompleteInputProps {
  control: Control<any, any>;
}

const AutocompleteInput: FC<AutocompleteInputProps> = (props) => {
  const { control } = props;

  const [openAutocomplete, setOpenAutocomplete] = useState(false);

  const { data, isLoading, refetch } = useIndicatorQuery(true);

  const { fields, append, remove } = useFieldArray({
    control,
    name: `indicator`,
  });

  return (
    <Autocomplete
      open={openAutocomplete}
      options={data}
      isOptionEqualToValue={(option, value) =>
        option.indicatorName === value.indicatorName
      }
      getOptionLabel={(option) =>
        `${option.indicatorCode} - ${option.indicatorName}`
      }
      loading={isLoading}
      onOpen={() => {
        refetch();
        setOpenAutocomplete(true);
      }}
      onClose={() => {
        setOpenAutocomplete(false);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Pilih indikator"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AutocompleteInput;
