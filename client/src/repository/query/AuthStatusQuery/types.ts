export interface AuthStatusData {
  isAuthenticated: boolean;
}

export interface AuthStatusResponse {
  data: AuthStatusData;
}

// -- NORMALIZED TYPES -- //

export interface AuthStatusNormalized {
  isAuthenticated: boolean;
}
