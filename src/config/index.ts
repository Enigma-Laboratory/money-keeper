import developmentConfig from './development';
import productionConfig from './production';

export interface EnvironmentConfig {
  apiUrl: string;
  debugMode: boolean;
  appTitle: string;
}

export interface AppConfig {
  development: EnvironmentConfig;
  production: EnvironmentConfig;
}

const config: AppConfig = {
  development: developmentConfig,
  production: productionConfig,
};

const environment = (process.env.REACT_APP_ENV || 'development') as keyof AppConfig;

export const appConfig = config[environment];
