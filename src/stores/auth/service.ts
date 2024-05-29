import { CreateUserParams, ForgotPasswordParams, LoginParams, User } from '@enigma-laboratory/shared';
import { notification } from 'antd';
import { useLocalStorage } from 'hooks';
import { AuthApiService, UserApiService } from 'services';
import { REFRESH_TOKEN_KEY, TOKEN_KEY, USER_IDENTITY } from 'utils';
import {
  AuthActionResponse,
  AuthenticatedResponse,
  DEFAULT_USER_VALUES,
  IdentityResponse,
  PermissionResponse,
  SetTokenParams,
} from './interfaces';

export class AuthService {
  private static _instance: AuthService;

  public static get instance(): AuthService {
    if (!AuthService._instance) {
      this._instance = new AuthService();
    }
    return this._instance;
  }

  private setAuth = (params: User): void => {
    localStorage.setItem(USER_IDENTITY, JSON.stringify(params));
  };

  private clearTokens = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  };

  private setTokens = ({ token, refreshToken }: SetTokenParams): void => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  };

  public getAuth = () => {
    const [user] = useLocalStorage<User>(USER_IDENTITY, DEFAULT_USER_VALUES);
    return user;
  };

  public signIn = async (params: LoginParams): Promise<AuthActionResponse> => {
    try {
      const tokens = await AuthApiService.instance.signIn(params);
      this.setTokens(tokens);

      const user = await UserApiService.instance.fetchOneUser({ email: params.email });
      this.setAuth(user);
    } catch (error) {
      this.clearTokens();
      return {
        success: false,
        error: error as Error,
      };
    }

    return {
      success: true,
      redirectTo: '/',
    };
  };

  public register = async (params: CreateUserParams): Promise<AuthActionResponse> => {
    try {
      await AuthApiService.instance.signUp(params);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error as Error,
      };
    }
  };

  public forgotPassword = async (params: ForgotPasswordParams): Promise<AuthActionResponse> => {
    try {
      await AuthApiService.instance.forgotPassword(params);
    } catch (error) {
      return { success: false, error: error as Error };
    }
    notification.success({
      message: 'Reset Password',
      description: `Reset password link sent to "${params.email}"`,
    });

    return {
      success: true,
    };
  };

  public logout = async (): Promise<AuthActionResponse> => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) || '';
      await AuthApiService.instance.signOut({ refreshToken });
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_IDENTITY);
      return {
        success: true,
        redirectTo: '/login',
      };
    } catch {
      return {
        success: false,
      };
    }
  };

  public checkAuthenticated = (): AuthenticatedResponse => {
    const [token] = useLocalStorage<string>(TOKEN_KEY);
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
  };

  public getIdentity = async (): Promise<IdentityResponse> => {
    return Promise.resolve();
  };

  public getPermissions = async (): Promise<PermissionResponse> => {
    return Promise.resolve();
  };
}
