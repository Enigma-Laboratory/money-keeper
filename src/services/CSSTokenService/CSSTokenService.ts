import { GlobalToken } from 'antd';

/**
 * useToken in antd can only be called inside of the body of a function component
 * so CSSTokenService can call in many situations such as calling in styled-components...
 *
 * First, create only one time in the context of a <Router> component.
 * Then, using in a normal class.
 */
export class CSSTokenService {
  private static _instance: CSSTokenService;
  private token: GlobalToken | null;

  constructor() {
    this.token = null;
  }

  public static get instance(): CSSTokenService {
    if (!this._instance) {
      this._instance = new CSSTokenService();
    }
    return this._instance;
  }

  public setToken(useToken: GlobalToken) {
    this.token = useToken;
  }

  public static get token(): GlobalToken {
    return this.token;
  }
}
