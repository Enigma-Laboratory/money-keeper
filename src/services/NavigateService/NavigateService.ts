import { NavigateFunction } from 'react-router-dom';

/**
 * useNavigate can only be called inside of the body of a function component
 * and may be used only in the context of a <Router> component
 * so NavigateService call call in many situations such as creating axios...
 *
 * First, create only one time in the context of a <Router> component.
 * Then, using in a normal function.
 */
export class NavigateService {
  private static _instance: NavigateService;
  private navigateFc: NavigateFunction | null = null;

  private constructor() {}

  public static get instance(): NavigateService {
    return this._instance || new this();
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
