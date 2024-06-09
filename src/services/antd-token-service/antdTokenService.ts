import { AliasToken } from 'antd/es/theme/internal';

export class AntdTokenService {
  private static _instance: AntdTokenService;
  public theme: AliasToken;

  constructor() {
    this.theme = {} as AliasToken;
  }

  public static get instance(): AntdTokenService {
    if (!this._instance) {
      this._instance = new AntdTokenService();
    }
    return this._instance;
  }

  public setToken(useToken: AliasToken) {
    this.theme = useToken;
  }
}
