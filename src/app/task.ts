export interface Task {
    id: number;
  taskName: string;
  taskDescription: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
  date: string;
}
