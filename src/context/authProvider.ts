import { CreateUserParams, LoginParams } from '@enigma-laboratory/shared';
import { notification } from 'antd';
import { AuthApiService } from 'services/AuthApiService';
import { UserApiService } from 'services/UserApiService';
import { REFRESH_TOKEN_KEY, TOKEN_KEY, USER_IDENTITY } from 'utils';

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
type ForgotPasswordParams = {
  email: string;
};
export type PermissionResponse = unknown;
export type IdentityResponse = unknown;

type AuthProvider = {
  login: (params: LoginParams) => Promise<AuthActionResponse>;
  logout: () => AuthActionResponse;
  check: () => CheckResponse;
  register?: (params: CreateUserParams) => Promise<AuthActionResponse>;
  forgotPassword?: (params: ForgotPasswordParams) => Promise<AuthActionResponse>;
  updatePassword?: () => Promise<AuthActionResponse>;
  getPermissions?: (params?: Record<string, object>) => Promise<PermissionResponse>;
  getIdentity?: () => Promise<IdentityResponse>;
};

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { token, refreshToken } = await AuthApiService.instance.signIn({ email, password });
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

    try {
      const { token } = await AuthApiService.instance.signIn({ email, password });
      localStorage.setItem(TOKEN_KEY, token || '');

      const user = await UserApiService.instance.fetchOneUser({ email });
      localStorage.setItem(USER_IDENTITY, JSON.stringify(user));
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }

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
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) || '';
      await AuthApiService.instance.signOut({ refreshToken });
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_IDENTITY);
    } catch {
      return {
        success: false,
      };
    }
    return {
      success: true,
      redirectTo: '/login',
    };
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
