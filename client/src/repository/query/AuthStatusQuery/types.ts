export interface AuthStatusData {
  isAuthenticated: boolean;
  isManagement: boolean;
}

export interface AuthStatusResponse {
  data: AuthStatusData;
}

// -- NORMALIZED TYPES -- //

export interface AuthStatusNormalized {
  isAuthenticated: boolean;
  isManagement: boolean;
}
