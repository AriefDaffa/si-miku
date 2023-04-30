export interface UserList {
  user_id: number;
  user_name: string;
  user_email: string;
  user_image: string;
}

export interface UserDataOverview {
  total_data: number;
  total_page: number;
  current_page: number;
  user_list: UserList[];
}

export interface UserResponse {
  data: UserDataOverview;
}

// -- NORMALIZED TYPES -- //

export interface UserListNormalized {
  userID: number;
  userName: string;
  userEmail: string;
  userImage: string;
}

export interface UserDataOverviewNormalized {
  totalData: number;
  totalPage: number;
  currentPage: number;
  userList: UserListNormalized[];
}
