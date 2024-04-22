import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../task.service';
import { TaskCreateComponent } from '../task-create/task-create.component';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent {
  task: any = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // private dialog: MatDialog<TaskDetailComponent>,
    private dialog: MatDialogRef<TaskCreateComponent>,

    private taskService: TaskService
  ) {
    this.loadTask(data.taskId);
  }

  loadTask(id: number) {
    this.taskService.getTaskById(id).subscribe((task) => {
      this.task = task;
      // this.dialog.close(true);
    });
  }
}
