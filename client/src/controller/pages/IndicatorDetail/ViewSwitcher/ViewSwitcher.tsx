import { Fragment } from 'react';
import type { FC } from 'react';

import type {
  GetDepartmentNormalizedResult,
  GetFacultyNormalizedResult,
  GetMajorNormalizedResult,
} from '@/pages/Indicator/IndicatorDetail/types';

import MajorView from '@/presentation/page-component/IndicatorDetail/MajorView';
import DepProdView from '@/presentation/page-component/IndicatorDetail/DepProdView';
import DepartmentView from '@/presentation/page-component/IndicatorDetail/DepartmentView';
// import MajorInputButton from '@/presentation/page-component/Department/InputButton/MajorInputButton';
// import DepartmentInputButton from '@/presentation/page-component/Department/InputButton/DepartmentInputButton';
// import FacultyInputButton from '@/presentation/page-component/Department/InputButton/FacultyInputButton/FacultyInputButton';

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
          {/* <DepartmentInputButton
            indicatorID={indicatorID}
            indicatorName={indicatorName}
            data={departmentData.data}
          /> */}
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
          {/* <MajorInputButton
            indicatorID={indicatorID}
            indicatorName={indicatorName}
            data={majorData.data}
          /> */}
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
          {/* <MajorInputButton
            indicatorID={indicatorID}
            indicatorName={indicatorName}
            data={majorData.data}
          /> */}
        </Fragment>
      );
    default:
      return (
        <Fragment>
          {/* <FacultyInputButton
            indicatorID={indicatorID}
            indicatorName={indicatorName}
            data={facultyData.data}
          /> */}
        </Fragment>
      ); // add fallback
  }
};

export default ViewSwitcher;
