export interface CurrentUserData {
  username: string;
  email: string;
  userImage: string;
}

export interface CurrentUserResponse {
  data: CurrentUserData;
}

// -- NORMALIZED TYPES -- //

export interface CurrentUserResponseNormalized {
  userName: string;
  email: string;
  userImage: string;
}
