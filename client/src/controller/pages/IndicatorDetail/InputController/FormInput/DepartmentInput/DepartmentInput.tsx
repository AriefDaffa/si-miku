import * as yup from 'yup';
import moment from 'moment';
import { useState, useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import type { FC, Dispatch, SetStateAction, SyntheticEvent } from 'react';

import YearPicker from '@/presentation/global-component/UI/YearPicker/YearPicker';
import DepartmentPicker from '@/presentation/page-component/common/DepartmentPicker';
import FormInputContainer from '@/presentation/page-component/IndicatorDetail/IndicatorDetailInput/FormInput/FormInputContainer';
import FormInputTitle from '@/presentation/page-component/IndicatorDetail/IndicatorDetailInput/FormInput/FormInputTitle';
import FormInputComponent from '@/presentation/page-component/IndicatorDetail/IndicatorDetailInput/FormInput/FormInputComponent';
import useInputDataDepartmentMutation from '@/repository/mutation/department/InputDataDepartmentMutation';
import { useYupValidationResolver } from '@/controller/hooks/use-yup-validation-resolver';
import type { IndicatorDepartmentsNormalized } from '@/repository/query/indicator/IndicatorByIdQuery';

interface DepartmentInputProps {
  open: boolean;
  indicatorID: number;
  indicatorName: string;
  department: IndicatorDepartmentsNormalized[];
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DepartmentInput: FC<DepartmentInputProps> = (props) => {
  const { open, setOpen, indicatorName, indicatorID, department } = props;

  const schema = yup.object().shape({
    q1: yup
      .number()
      .typeError('Input harus berupa angka')
      .required('Field tidak boleh kosong!'),
    q2: yup
      .number()
      .typeError('Input harus berupa angka')
      .required('Field tidak boleh kosong!'),
    q3: yup
      .number()
      .typeError('Input harus berupa angka')
      .required('Field tidak boleh kosong!'),
    q4: yup
      .number()
      .typeError('Input harus berupa angka')
      .required('Field tidak boleh kosong!'),
    target_value: yup
      .number()
      .typeError('Input harus berupa angka')
      .required('Field tidak boleh kosong!'),
  });

  const resolver = useYupValidationResolver(schema);

  const [selectedYear, setSelectedYear] = useState('2023');
  const [successDialog, setSuccessDialog] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(1);

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, isError, error, isSuccess } =
    useInputDataDepartmentMutation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
      target_value: 0,
    },
    resolver,
  });

  const handleOnSubmit = (data: {
    q1: number;
    q2: number;
    q3: number;
    q4: number;
    target_value: number;
  }) => {
    const { q1, q2, q3, q4, target_value } = data;

    const year_value = Number(selectedYear);

    if (Number.isNaN(year_value)) {
      return;
    }

    const payload = {
      indicator_id: indicatorID,
      department_id: department[currentDepartment - 1].department.departmentID,
      indicator_data: {
        q1,
        q2,
        q3,
        q4,
        target_value,
        year_value,
      },
    };

    setLoading(true);

    mutate(payload, {
      onSuccess: (res) => {
        if (res.status >= 400) {
          throw res.data.message;
        } else {
          setLoading(false);

          queryClient.invalidateQueries({
            queryKey: ['indicator', String(indicatorID)],
          });
        }
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  const handleClose = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleMessageClose = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSuccessDialog(false);
  };

  const handleSelectYear = useCallback((year: string | null) => {
    if (year !== null) {
      setSelectedYear(String(moment(year).year()));
    }
  }, []);

  return (
    <FormInputContainer
      isLoading={loading}
      openDialog={open}
      openSuccessDialog={successDialog}
      handleClose={handleClose}
      handleSuccessClose={handleMessageClose}
    >
      <FormInputTitle indicatorName={indicatorName} />
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <FormInputComponent
          control={control}
          error={error}
          isError={isError}
          isSuccess={isSuccess}
          PickerComponent={
            <DepartmentPicker
              currentDepartment={currentDepartment}
              department={department}
              setCurrentDepartment={setCurrentDepartment}
            />
          }
          YearPickerComponent={
            <YearPicker
              yearValue={selectedYear}
              handleSelectYear={handleSelectYear}
            />
          }
        />
      </form>
    </FormInputContainer>
  );
};

export default DepartmentInput;
