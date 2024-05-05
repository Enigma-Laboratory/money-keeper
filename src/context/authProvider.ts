import { notification } from 'antd';
import { disableAutoLogin } from 'hooks';
import { AuthApiService } from 'services/AuthApiService';
import { UserApiService } from 'services/UserApiService';

export const TOKEN_KEY = 'money-keeper-auth';
export const USER_IDENTITY = 'user-identity-auth';

export type SuccessNotificationResponse = {
  message: string;
  description?: string;
};

export type AuthActionResponse = {
  success: boolean;
  redirectTo?: string;
  error?: Error;
  [key: string]: unknown;
  successNotification?: SuccessNotificationResponse;
};

export type OnErrorResponse = {
  redirectTo?: string;
  logout?: boolean;
  error?: Error;
};

export type CheckResponse = {
  authenticated: boolean;
  redirectTo?: string;
  logout?: boolean;
  error?: Error;
};

export type PermissionResponse = unknown;
export type IdentityResponse = unknown;

type AuthProvider = {
  login: (params: any) => Promise<AuthActionResponse>;
  logout: (params: any) => Promise<AuthActionResponse>;
  onError: (error: any) => Promise<OnErrorResponse>;
  check: (params?: any) => CheckResponse;
  register?: (params: any) => Promise<AuthActionResponse>;
  forgotPassword?: (params: any) => Promise<AuthActionResponse>;
  updatePassword?: (params: any) => Promise<AuthActionResponse>;
  getPermissions?: (params?: Record<string, any>) => Promise<PermissionResponse>;
  getIdentity?: (params?: any) => Promise<IdentityResponse>;
};

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { token } = await AuthApiService.instance.signIn({ email, password });
    const user = await UserApiService.instance.fetchOneUser({ email });
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_IDENTITY, JSON.stringify(user));
    return {
      success: true,
      redirectTo: '/',
    };
  },
  register: async ({ name, email, password }) => {
    try {
      await AuthApiService.instance.signUp({ name, email, password });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: 'Register failed',
          name: 'Invalid email or password',
        },
      };
    }
  },
  updatePassword: async () => {
    notification.success({
      message: 'Updated Password',
      description: 'Password updated successfully',
    });
    return {
      success: true,
    };
  },
  forgotPassword: async ({ email }) => {
    notification.success({
      message: 'Reset Password',
      description: `Reset password link sent to "${email}"`,
    });
    return {
      success: true,
    };
  },
  logout: async () => {
    disableAutoLogin();
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_IDENTITY);
    return {
      success: true,
      redirectTo: '/login',
    };
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
  check: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      error: {
        message: 'Check failed',
        name: 'Token not found',
      },
      logout: true,
      redirectTo: '/login',
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }

    return {
      id: 1,
      name: 'James Sullivan',
      avatar: 'https://i.pravatar.cc/150',
    };
  },
};
