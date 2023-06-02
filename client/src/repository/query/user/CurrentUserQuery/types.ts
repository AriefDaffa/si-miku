export interface CurrentUserData {
  profession: string;
  email: string;
  userImage: string;
  role: string;
}

export interface CurrentUserResponse {
  data: CurrentUserData;
}

// -- NORMALIZED TYPES -- //

export interface CurrentUserResponseNormalized {
  profession: string;
  email: string;
  userImage: string;
  role: string;
}
