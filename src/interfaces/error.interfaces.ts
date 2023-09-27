import MessageResponse from './response.interfaces';

export default interface ErrorResponse extends MessageResponse {
  stack?: string;
}