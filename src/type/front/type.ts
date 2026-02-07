export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
  status: number;
};
export type LoginResponse = ApiResponse<{
  role: 'user' | 'admin';
}>;
