import { Dispatch } from 'react';
import type { ReactNode, SetStateAction } from 'react';

interface HeadlineTypes {
  title: string;
  subTitle: string;
}

export interface HeadlineInterface {
  headline: HeadlineTypes;
  setHeadline: Dispatch<SetStateAction<HeadlineTypes>>;
}

export interface HeadlineProps {
  children: ReactNode;
}

// const [headline, setHeadline] = useState({
// title: 'List Indikator',
// subTitle:
//   'Menampilkan progress perkembangan seluruh data indikator yang terdapat pada sistem',
// });
