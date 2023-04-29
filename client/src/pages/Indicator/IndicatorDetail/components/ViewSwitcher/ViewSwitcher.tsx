import { Fragment } from 'react';
import type { FC } from 'react';

import type {
  GetDepartmentNormalizedResult,
  GetFacultyNormalizedResult,
  GetMajorNormalizedResult,
} from '@/pages/Indicator/IndicatorDetail/types';

import DepartmentView from '../DepartmentView';
import MajorView from '../MajorView';
import DepProdView from '../DepProdView';
import MajorInputButton from '../InputButton/MajorInputButton';
import DepartmentInputButton from '../InputButton/DepartmentInputButton';
import FacultyInputButton from '../InputButton/FacultyInputButton/FacultyInputButton';

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
          <DepartmentInputButton
            indicatorID={indicatorID}
            indicatorName={indicatorName}
            data={departmentData.data}
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
          <MajorInputButton
            indicatorID={indicatorID}
            indicatorName={indicatorName}
            data={majorData.data}
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
          <MajorInputButton
            indicatorID={indicatorID}
            indicatorName={indicatorName}
            data={majorData.data}
          />
        </Fragment>
      );
    default:
      return (
        <Fragment>
          <FacultyInputButton
            indicatorID={indicatorID}
            indicatorName={indicatorName}
            data={facultyData.data}
          />
        </Fragment>
      ); // add fallback
  }
};

export default ViewSwitcher;
