import type { FC } from 'react';

import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Avatar from '@mui/material/Avatar';

import { SubHeader } from '@/presentation/global-component/UI/Typography';
import notFoundImg from '@/assets/logo/empty.png';

interface IndicatorTableEmptyProps {
  message: string;
}

const IndicatorTableEmpty: FC<IndicatorTableEmptyProps> = (props) => {
  const { message } = props;

  return (
    <TableRow>
      <TableCell colSpan={100}>
        <Stack justifyContent="center" alignItems="center">
          <img src={notFoundImg} alt="" style={{ maxWidth: '200px' }} />
          <SubHeader text={message} />
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default IndicatorTableEmpty;
