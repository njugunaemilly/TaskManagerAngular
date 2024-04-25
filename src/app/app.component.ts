import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskService } from './task.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { TaskDetailComponent } from './task-detail/task-detail.component';
import { CoreService } from './core.service';
import { ModalDialogService } from './modal-dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'task-management';
  displayedColumns: string[] = [
    'taskName',
    'taskDescription',
    'status',
    'date',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;
  originalDataSource: MatTableDataSource<any>;
  pendingTasks: any[] = [];
  completedTasks: any[] = [];
  cancelledTasks: any[] = [];

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private core: CoreService,
    private dialogService: ModalDialogService
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
    this.originalDataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {
    this.getTasks();
  }
  openTasksForm() {
    const dialogRef = this.dialog.open(TaskCreateComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getTasks();
        }
      },
    });
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.dataSource = res;
        this.pendingTasks = res.filter(
          (task: { status: string }) => task.status === 'Pending'
        );
        this.completedTasks = res.filter(
          (task: { status: string }) => task.status === 'Completed'
        );
        this.cancelledTasks = res.filter(
          (task: { status: string }) => task.status === 'Cancelled'
        );
        
      },
      error: console.log,
    });
  }

  updateTask(data: any) {
    const dialogRef = this.dialog.open(TaskCreateComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getTasks();
        }
      },
    });
  }

  viewTask(id: number) {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '400px',
      data: { taskId: id },
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: (res) => {
        this.core.openSnackBar('Task deleted successfully');

        this.getTasks();
      },
      error: console.log,
    });
  }

  applyFilters(filters: any) {
    const searchText =
      typeof filters.searchText === 'string'
        ? filters.searchText.trim().toLowerCase()
        : '';
    const status = (
      typeof filters.status === 'string' ? filters.status : ''
    ).toLowerCase();

    this.taskService.getTasks().subscribe({
      next: (res) => {
        let filteredTasks = res.filter(
          (task: { taskName: string; status: string }) => {
            const matchesSearchText = task.taskName
              .toLowerCase()
              .includes(searchText);
            const matchesStatus =
              !status || task.status.toLowerCase() === status;
            return matchesSearchText && matchesStatus;
          }
        );

        this.dataSource = new MatTableDataSource(filteredTasks);
      },
      error: console.error,
    });
  }
}
