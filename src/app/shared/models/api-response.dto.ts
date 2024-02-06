export interface ApiResponse {
  alertOK: boolean;
  submitted: boolean;
  responseError: string;
}
export class ApiResponse implements ApiResponse {
  constructor(
    public alertOK: boolean,
    public submitted: boolean,
    public responseError: string
  ) {
    this.alertOK = alertOK;
    this.submitted = submitted;
    this.responseError = responseError;
  }
}
