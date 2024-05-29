import { NavigateFunction } from 'react-router-dom';

/**
 * useNavigate can only be called inside of the body of a function component
 * and may be used only in the context of a <Router> component
 * so NavigateService can call in many situations such as calling API response...
 *
 * First, create only one time in the context of a <Router> component.
 * Then, using in a normal class.
 */
export class NavigateService {
  private static _instance: NavigateService;
  private navigateFc: NavigateFunction | null;

  constructor() {
    this.navigateFc = null;
  }

  public static get instance(): NavigateService {
    if (!this._instance) {
      this._instance = new NavigateService();
    }
    return this._instance;
  }

  public setNavigate(useNavigate: NavigateFunction) {
    this.navigateFc = useNavigate;
  }

  public navigate(path: string) {
    if (this.navigateFc === null) {
      throw new Error('Navigate function is not set.');
    }
    this.navigateFc(path);
  }
}
