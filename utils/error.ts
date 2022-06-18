export enum ErrorCode {
  DATE_AND_TIME_AFTER_PREVIOUS_ONE,
}

export class CustomError extends Error {
  public code: ErrorCode;

  constructor(err: { code: ErrorCode; message: string }) {
    super();
    this.code = err.code;
    this.message = err.message;
  }
}
