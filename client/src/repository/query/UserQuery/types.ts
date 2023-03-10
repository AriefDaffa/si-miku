export interface UserData {
  user_id: number;
  user_name: string;
  user_email: string;
}

export interface UserResponse {
  data: UserData[];
}

// -- NORMALIZED TYPES -- //

export interface UserDataNormalized {
  userID: number;
  userName: string;
  userEmail: string;
}
