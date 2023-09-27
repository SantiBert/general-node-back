export class HttpException extends Error {
    public internalCode: string;
    public status: number;
    public message: string;
  
    public constructor(internalCode: string, status: number, message = '') {
      super(message);
      this.internalCode = internalCode;
      this.status = status;
      this.message = message;
    }
  }
  
  export function createException(internalCode: string, status: number): any {
    return (message: string): HttpException =>
      new HttpException(internalCode, status, message);
  }