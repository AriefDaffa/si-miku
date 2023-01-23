import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import type { FC, SyntheticEvent } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { SelectChangeEvent } from '@mui/material/Select';

import type { IndicatorResponseNormalized } from '@/repository/query/IndicatorQuery/types';

interface ToolbarSectionProps {
  indicator: IndicatorResponseNormalized[];
}

const ToolbarSection: FC<ToolbarSectionProps> = (props) => {
  const { indicator } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = searchParams.get('id') || '';

  const handleChange = (
    event: SyntheticEvent,
    values: IndicatorResponseNormalized | null
  ) => {
    if (values !== null) {
      setSearchParams({ id: String(values.indicatorID) });
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ pb: 2 }}>
        Pilih Indikator
      </Typography>
      <Autocomplete
        id="combo-box-demo"
        getOptionLabel={(indicator) =>
          `${indicator.indicatorID} - ${indicator.indicatorName}`
        }
        options={indicator}
        renderOption={(props, indicator) => (
          <Box
            component="li"
            {...props}
            key={indicator.indicatorID}
            sx={{ zIndex: 40 }}
          >
            {indicator.indicatorName}
          </Box>
        )}
        isOptionEqualToValue={(option, value) =>
          option.indicatorID === value.indicatorID
        }
        onChange={(e, values) => handleChange(e, values)}
        renderInput={(params) => <TextField {...params} label="Indikator" />}
      />
    </>
  );
};

export default ToolbarSection;
