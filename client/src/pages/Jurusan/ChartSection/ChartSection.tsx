import type { FC } from 'react';

import CustomGrid from '@/components/CustomGrid';

import CustomCard from '@/components/CustomCard';

interface ChartSectionProps {}

const ChartSection: FC<ChartSectionProps> = (props) => {
  const {} = props;

  return <CustomGrid sm={[6, 6, 12, 8, 4]} sx={{ pt: 2 }} gridItem={[]} />;
};

export default ChartSection;
