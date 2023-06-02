import type { FC } from 'react';

import type {
  GetDepartmentNormalizedResult,
  GetFacultyNormalizedResult,
  GetMajorNormalizedResult,
} from '@/controller/pages/IndicatorDetail/types';

import MajorView from './MajorView';
import FacultyView from './FacultyView';
import DepProdView from './DepProdView';
import DepartmentView from './DepartmentView';

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
        <DepartmentView
          indicatorID={indicatorID}
          indicatorName={indicatorName}
          departmentData={departmentData}
        />
      );
    case 3:
      return (
        <MajorView
          indicatorID={indicatorID}
          indicatorName={indicatorName}
          majorData={majorData}
        />
      );
    case 4:
      return (
        <DepProdView
          indicatorID={indicatorID}
          indicatorName={indicatorName}
          majorData={majorData}
          departmentData={departmentData}
        />
      );
    default:
      return (
        <FacultyView
          indicatorID={indicatorID}
          indicatorName={indicatorName}
          facultyData={facultyData}
        />
      );
  }
};

export default ViewSwitcher;
