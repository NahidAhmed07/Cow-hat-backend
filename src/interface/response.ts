export type ISendResponse<T> = {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
  meta?: {
    total: number;
    limit: number;
    page: number;
  };
};
