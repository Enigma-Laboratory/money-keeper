import { appConfig } from 'config';

export const changeTitleApp = (): void => {
  document.title = appConfig.appTitle;
};
