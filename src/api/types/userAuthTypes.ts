export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyResetCodeRequest {
  resetCode: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export interface UpdateUserDataRequest {
  name: string;
  email: string;
  phone: string;
}

export interface UserResponse {
  message?: string;
  user?: {
    name: string;
    email: string;
    role: string;
  };
  token?: string;
}

export interface AppUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
}

export interface GetAllUsersResponse {
  results: number;
  metadata?: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: AppUser[];
}
