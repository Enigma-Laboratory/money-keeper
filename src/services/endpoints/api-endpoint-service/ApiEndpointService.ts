import { appConfig } from 'config';

export class ApiEndpointService {
  protected endPoint: string;
  constructor() {
    this.endPoint = appConfig.apiUrl;

    if (!this.endPoint || typeof this.endPoint !== 'string') {
      throw new Error('Invalid API endpoint configuration');
    }
  }
}
