export interface Year {
  year_id: number;
  year_value: number;
}

export interface TargetQuarter {
  target_value: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  target_quarter_id: number;
  is_target_fulfilled: boolean;
  year: Year;
}

interface TargetDeps {
  target_dep_id: number;
  target_quarter: TargetQuarter;
}
interface IndicatorFac {
  indicator_faculty_id: number;
  target_quarter: TargetQuarter;
}
interface IndicatorMaj {
  indicator_major_id: number;
  target_quarter: TargetQuarter;
}

interface Department {
  department_id: number;
  department_name: string;
  department_image: string;
}
interface Faculty {
  faculty_id: number;
  faculty_name: string;
}
interface Major {
  major_id: number;
  major_name: string;
  major_image: string;
  department_id: number;
}

interface IndicatorDepartments {
  indicator_department_id: number;
  target_deps: TargetDeps[];
  department: Department;
}
interface IndicatorFaculties {
  indicator_faculty_id: number;
  target_faculties: IndicatorFac[];
  faculty: Faculty;
}
interface IndicatorMajors {
  indicator_major_id: number;
  target_majors: IndicatorMaj[];
  major: Major;
}

export interface IndicatorByIdData {
  indicator_id: number;
  indicator_code: string;
  indicator_name: string;
  indicator_type: number;
  indicator_data_type: number;
  indicator_departments: IndicatorDepartments[];
  indicator_faculties: IndicatorFaculties[];
  indicator_majors: IndicatorMajors[];
}

export interface IndicatorByIdResponse {
  data: IndicatorByIdData;
}

// ------ NORMALIZED TYPES ------ //
interface YearNormalized {
  yearID: number;
  yearValue: number;
}

export interface TargetQuarterNormalized {
  targetValue: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  targetQuarterID: number;
  isTargetFulfilled: boolean;
  year: YearNormalized;
}

interface TargetDepsNormalized {
  targetDepID: number;
  targetQuarter: TargetQuarterNormalized;
}
interface IndicatorFacNormalized {
  indicatorFacultyID: number;
  targetQuarter: TargetQuarterNormalized;
}
export interface IndicatorMajNormalized {
  indicatorMajorID: number;
  targetQuarter: TargetQuarterNormalized;
}

interface DepartmentNormalized {
  departmentID: number;
  departmentName: string;
  departmentImage: string;
}
interface FacultyNormalized {
  facultyID: number;
  facultyName: string;
}
interface MajorNormalized {
  majorID: number;
  majorName: string;
  majorImage: string;
  departmentID: number;
}

export interface IndicatorDepartmentsNormalized {
  indicatorDepartmentID: number;
  targetDeps: TargetDepsNormalized[];
  department: DepartmentNormalized;
}
export interface IndicatorFacultiesNormalized {
  indicatorFacultyID: number;
  targetFaculties: IndicatorFacNormalized[];
  faculty: FacultyNormalized;
}
export interface IndicatorMajorsNormalized {
  indicatorMajorID: number;
  targetMajors: IndicatorMajNormalized[];
  major: MajorNormalized;
}

export interface IndicatorByIdDataNormalized {
  indicatorID: number;
  indicatorCode: string;
  indicatorName: string;
  indicatorType: number;
  indicatorDepartments: IndicatorDepartmentsNormalized[];
  indicatorFaculties: IndicatorFacultiesNormalized[];
  indicatorMajors: IndicatorMajorsNormalized[];
}
