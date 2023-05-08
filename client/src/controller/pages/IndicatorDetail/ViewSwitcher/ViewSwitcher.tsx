import { Fragment } from 'react';
import type { FC } from 'react';

import type {
  GetDepartmentNormalizedResult,
  GetFacultyNormalizedResult,
  GetMajorNormalizedResult,
} from '@/controller/pages/IndicatorDetail/types';

import MajorView from '@/presentation/page-component/IndicatorDetail/IndicatorDetailView/MajorView';
import DepProdView from '@/presentation/page-component/IndicatorDetail/IndicatorDetailView/DepProdView';
import DepartmentView from '@/presentation/page-component/IndicatorDetail/IndicatorDetailView/DepartmentView';
import FacultyView from '@/presentation/page-component/IndicatorDetail/IndicatorDetailView/FacultyView/FacultyView';

interface ViewSwitcherProps {
  indicatorName: string;
  indicatorID: number;
  indicatorType: number;
  majorData: GetMajorNormalizedResult;
  departmentData: GetDepartmentNormalizedResult;
  facultyData: GetFacultyNormalizedResult;
}

const ViewSwitcher: FC<ViewSwitcherProps> = (props) => {
  const {
    indicatorType,
    indicatorID,
    indicatorName,
    majorData,
    departmentData,
    facultyData,
  } = props;

  switch (indicatorType) {
    case 2:
      return (
        <Fragment>
          <DepartmentView
            indicatorID={indicatorID}
            indicatorName={indicatorName}
            departmentData={departmentData}
          />
        </Fragment>
      );
    case 3:
      return (
        <Fragment>
          <MajorView
            indicatorID={indicatorID}
            indicatorName={indicatorName}
            majorData={majorData}
          />
        </Fragment>
      );
    case 4:
      return (
        <Fragment>
          <DepProdView
            indicatorID={indicatorID}
            indicatorName={indicatorName}
            majorData={majorData}
            departmentData={departmentData}
          />
        </Fragment>
      );
    default:
      return (
        <Fragment>
          <FacultyView
            indicatorID={indicatorID}
            indicatorName={indicatorName}
          />
        </Fragment>
      );
  }
};

export default ViewSwitcher;
