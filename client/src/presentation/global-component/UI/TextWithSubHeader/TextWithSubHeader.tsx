import type { FC } from 'react';

import Stack from '@mui/material/Stack';

import { Header, SubHeader } from '@/components/UI/atoms/Typography';

interface TextWithSubHeaderProps {
  subHeader: string;
  header: string;
}

const TextWithSubHeader: FC<TextWithSubHeaderProps> = (props) => {
  const { header, subHeader } = props;

  return (
    <Stack flexDirection="column">
      <SubHeader text={subHeader} />
      <Header text={header} />
    </Stack>
  );
};

export default TextWithSubHeader;
