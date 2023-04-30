import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import type { FC } from 'react';

import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';
import Link from '@mui/material/Link';

import { GREY } from '@/presentation/global-component/theme/Colors';
import {
  Header,
  SubHeader,
} from '@/presentation/global-component/UI/Typography';

const Breadcrumbs: FC = () => {
  const location = useLocation();

  const splitLoc = useMemo(
    () => location.pathname.split('/').filter((el) => el.length > 0),
    [location.pathname]
  );

  const generatePath = splitLoc.reduce<string[]>((acc, cur, index) => {
    if (index === 0) {
      acc.push(cur);
    } else if (index === 1) {
      const link = acc[0] + '/' + cur;
      acc.push(link);
    } else {
      const link = acc[index - 1] + '/' + cur;
      acc.push(link);
    }

    return acc;
  }, []);

  return (
    <MuiBreadcrumbs>
      {generatePath.map((item, idx) =>
        idx !== generatePath.length - 1 ? (
          <Link
            key={idx}
            underline="hover"
            color="inherit"
            to={`/${item}`}
            component={RouterLink as any}
          >
            <SubHeader
              text={
                splitLoc[idx].charAt(0).toUpperCase() + splitLoc[idx].slice(1)
              }
            />
          </Link>
        ) : (
          <Header
            key={idx}
            text={
              splitLoc[idx].charAt(0).toUpperCase() + splitLoc[idx].slice(1)
            }
            variant="subtitle2"
          />
        )
      )}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
