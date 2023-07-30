export class ApiServiceEndPoint {
  public endPoint: string;
  constructor() {
    this.endPoint = "http://localhost:1337"; //process.env.NODE_ENV;
  }
}
