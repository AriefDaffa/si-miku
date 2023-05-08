import * as yup from 'yup';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import type { FC, ChangeEvent } from 'react';

import Card from '@/presentation/global-component/UI/Card';
import LoadingPopup from '@/presentation/global-component/UI/Loader/LoadingPopup';
import DialogPopup from '@/presentation/global-component/UI/DialogPopup';
import useUpdateUserProfileMutation from '@/repository/mutation/UpdateUserProfileMutation';
import { useCurrentUserQuery } from '@/repository/query/user/CurrentUserQuery';
import { useAuthContext } from '@/controller/context/AuthContext';
import { useYupValidationResolver } from '@/controller/hooks/use-yup-validation-resolver';

import ProfileImage from '@/presentation/page-component/Profile/ProfileImage';
import ProfileButton from '@/presentation/page-component/Profile/ProfileButton';
import ProfileForm from '@/presentation/page-component/Profile/ProfileForm';
import ProfileContainer from '@/presentation/page-component/Profile/ProfileContainer';
import { useHeadline } from '@/controller/context/HeadlineContext';

import type { UserData } from './types';

const Profile: FC = () => {
  const location = useLocation();
  const { isManagement } = useAuthContext();
  const { data, isLoading } = useCurrentUserQuery();
  const { setHeadline } = useHeadline();

  const [loading, setLoading] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [currentImage, setcurrentImage] = useState<any>('');
  const [inputKey, setInputKey] = useState('');

  const schema = yup.object().shape({
    user_name: yup.string().required('User Name tidak boleh kosong!'),
    user_email: yup
      .string()
      .email('Masukkan format email yang valid!')
      .required('Email tidak boleh kosong!'),
  });

  const resolver = useYupValidationResolver(schema);

  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      user_name: data.userName,
      user_email: data.email,
    },
    resolver,
  });

  const queryClient = useQueryClient();
  const { mutate } = useUpdateUserProfileMutation();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files;

    if (image && image[0]) {
      setcurrentImage(image[0]);
    }
  };

  const handleRemoveImage = () => {
    setcurrentImage('');
    setInputKey(Math.random().toString(36));
  };

  const onSubmit = (data: UserData) => {
    setLoading(true);

    const formData = new FormData();

    formData.append('user_name', data.user_name);
    formData.append('user_email', data.user_email);
    formData.append('profile-image', currentImage);

    mutate(formData, {
      onSuccess: (res) => {
        if (res.status >= 400) {
          throw res.data.message;
        } else {
          setSuccessDialog(true);
          setLoading(false);
        }

        queryClient.invalidateQueries('currentUser');
      },
      onError: (err) => {
        setLoading(false);
        console.log(err);
      },
    });
  };

  const setCloseDialog = () => {
    setSuccessDialog(false);
  };

  // fix missing value on refresh
  useEffect(() => {
    if (!isLoading && getValues().user_name === '') {
      setValue('user_name', data.userName);
      setValue('user_email', data.email);
    }

    if (location.pathname === '/dashboard/profile') {
      setHeadline({
        title: 'Profile',
        subTitle: 'Menampilkan profile pengguna',
        isYearPickerEnabled: false,
      });
    }

    if (data.userImage !== '') {
      setcurrentImage(data.userImage);
    }
  }, [isLoading, location]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProfileContainer>
          <ProfileImage currentImage={currentImage} />
          <ProfileButton
            currentImage={currentImage}
            inputKey={inputKey}
            handleImageChange={handleImageChange}
            handleRemoveImage={handleRemoveImage}
          />
          <ProfileForm control={control} isManagement={isManagement} />

          <DialogPopup
            title="Success!"
            bodyText="Profile berhasil diubah"
            buttonText=""
            handleClose={setCloseDialog}
            handleAccept={setCloseDialog}
            open={successDialog}
          />
          <LoadingPopup open={loading} />
        </ProfileContainer>
      </form>
    </Card>
  );
};

export default Profile;
