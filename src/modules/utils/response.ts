/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/response.ts
export interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  message: string;
  status: number;
}

export const apiResponse = <T>(
  success: boolean,
  message: string,
  status: number,
  data: T | null = null,
): ApiResponse<T> => {
  return {
    success,
    data,
    message,
    status,
  };
};
