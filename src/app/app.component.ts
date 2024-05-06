import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskService } from './task.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { TaskDetailComponent } from './task-detail/task-detail.component';
import { CoreService } from './core.service';
import { ModalDialogService } from './modal-dialog.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { Observable } from 'rxjs';

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
  tasks$ !: Observable<any[]>;
  loading !: boolean;
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
    this.tasks$ = this.taskService.getTasks();
    this.tasks$.subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.pendingTasks = res.filter((task) => task.status === 'Pending');
        this.completedTasks = res.filter((task) => task.status === 'Completed');
        this.cancelledTasks = res.filter((task) => task.status === 'Cancelled');
      },
      error: console.error,
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

  deleteTask(id: number){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'delete'){
        this.taskService.deleteTask(id).subscribe({
          next: (res)=>{
            this.core.openSnackBar('Task Deleted Suuccessfully');
            this.getTasks();
          },
          error: console.error
        })
      }
    })
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
