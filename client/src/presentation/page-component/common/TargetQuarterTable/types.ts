import type { ChangeEvent } from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';

interface TargetQuarterNormalized {
  targetValue: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  targetQuarterID: number;
  isTargetFulfilled: boolean;
  yearID: number;
}

export interface TargetQuarterTableDataArray {
  indicatorID: number;
  indicatorCode: string;
  indicatorName: string;
  indicatorType: number;
  supervisedBy: number;
  dataQuarter: TargetQuarterNormalized;
}

export interface TargetQuarterTableProps {
  currentPage: number;
  totalData: number;
  totalPage: number;
  isLoading: boolean;
  currentSize: number;
  dataArray: TargetQuarterTableDataArray[];
  handleTablePagination: (e: any, value: number) => void;
  handleTableSize: (event: SelectChangeEvent) => void;
  handleKeywordChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
