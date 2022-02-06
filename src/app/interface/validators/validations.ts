export interface Validation {
  [key: string]: ValidationMessage
}
export interface ValidationMessage {
  key: string;
  message: string;
}
