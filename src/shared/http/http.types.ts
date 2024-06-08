export interface ErrorResponse {
  // message: string;
  // details: Record<string, unknown>[] | string;
  // config: string;
  // status: string;
  // error: true;
  error: boolean;
  message: string;
  status: number;
}

export interface SuccessResponse<T> {
  data: T;
  message: string;
}
