import { LoginResponse } from '@enigma-laboratory/shared';

export type AuthActionResponse = {
  success: boolean;
  redirectTo?: string;
  error?: Error;
  [key: string]: unknown;
  successNotification?: SuccessNotificationResponse;
};

export type SuccessNotificationResponse = {
  message: string;
  description?: string;
};

export type AuthenticatedResponse = {
  authenticated: boolean;
  redirectTo?: string;
  logout?: boolean;
  error?: Error;
};

export type OnErrorResponse = {
  redirectTo?: string;
  logout?: boolean;
  error?: Error;
};

export type PermissionResponse = unknown;
export type IdentityResponse = unknown;

export type SetTokenParams = LoginResponse;

export const DEFAULT_USER_VALUES = {
  _id: '',
  name: '',
  email: '',
  password: '',
};
