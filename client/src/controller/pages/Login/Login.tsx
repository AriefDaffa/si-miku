import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import type { FC } from 'react';

import logo from '@/assets/logo/logo.png';
import FormComponent from '@/presentation/page-component/Login/FormComponent';
import LoginContainer from '@/presentation/page-component/Login/LoginContainer';
import TitleAndLogo from '@/presentation/page-component/Login/TitleAndLogo';
import { useLoginMutation } from '@/repository/mutation/auth/LoginMutation';
import { useYupValidationResolver } from '@/controller/hooks/use-yup-validation-resolver';

import type { LoginData } from './types';
import SubmitButton from '@/presentation/page-component/Login/SubmitButton';

const Login: FC = () => {
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    user_email: yup
      .string()
      .email('Value tidak valid!')
      .required('Email tidak boleh kosong!'),
    password: yup.string().required('Password tidak boleh kosong!'),
  });

  const resolver = useYupValidationResolver(schema);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      user_email: '',
      password: '',
    },
    resolver,
  });

  const navigate = useNavigate();
  const { mutate, isError, error, isLoading } = useLoginMutation();

  const onSubmit = (data: LoginData) => {
    setLoading(true);
    mutate(data, {
      onSuccess: (res) => {
        if (res.status >= 400) {
          throw res.data.message;
        } else {
          navigate('/');
          setLoading(false);
        }
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  return (
    <LoginContainer loading={loading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TitleAndLogo logo={logo} />
        <FormComponent control={control} error={error} isError={isError} />
        <SubmitButton isLoading={isLoading} />
      </form>
    </LoginContainer>
  );
};

export default Login;
