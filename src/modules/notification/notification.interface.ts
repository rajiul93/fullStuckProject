export interface INotification {
  _id?: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
