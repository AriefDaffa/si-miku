export interface AuthStatusData {
  isAuthenticated: boolean;
  roleId: number;
}

export interface AuthStatusResponse {
  data: AuthStatusData;
}

// -- NORMALIZED TYPES -- //

export interface AuthStatusNormalized {
  isAuthenticated: boolean;
  roleID: number;
}
