interface Role {
  role_id: number;
  role_name: string;
}

export interface UserList {
  user_id: number;
  profession: string;
  user_email: string;
  user_image: string;
  access_level: number;
  role: Role;
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
interface RoleNormalized {
  roleID: number;
  roleName: string;
}

export interface UserListNormalized {
  userID: number;
  profession: string;
  userEmail: string;
  userImage: string;
  accessLevel: number;
  role: RoleNormalized;
}

export interface UserDataOverviewNormalized {
  totalData: number;
  totalPage: number;
  currentPage: number;
  userList: UserListNormalized[];
}
