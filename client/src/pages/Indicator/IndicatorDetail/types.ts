import type {
  IndicatorFacultiesNormalized,
  IndicatorMajorsNormalized,
  IndicatorDepartmentsNormalized,
} from '@/repository/query/indicator/IndicatorByIdQuery';

export interface GetFacultyNormalizedResult {
  data: IndicatorFacultiesNormalized[];
  fulfilled: number;
  failed: number;
  notSet: number;
}

export interface GetMajorNormalizedResult {
  data: IndicatorMajorsNormalized[];
  fulfilled: number;
  failed: number;
  notSet: number;
}

export interface GetDepartmentNormalizedResult {
  data: IndicatorDepartmentsNormalized[];
  fulfilled: number;
  failed: number;
  notSet: number;
}
