import { debounce } from 'lodash';
import type { FC, ChangeEvent, Dispatch, SetStateAction } from 'react';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  placeholder?: string;
  handleKeywordChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<SearchBarProps> = (props) => {
  const { handleKeywordChange, placeholder = '' } = props;

  return (
    <TextField
      fullWidth
      variant="standard"
      // label="Cari Indikator"
      placeholder={placeholder}
      onChange={debounce(handleKeywordChange, 600)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        disableUnderline: true,
      }}
    />
  );
};

export default SearchBar;
