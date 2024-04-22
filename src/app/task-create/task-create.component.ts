import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from '../task.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
})
export class TaskCreateComponent implements OnInit{
  tasksForm: FormGroup;

  taskStatus: string[] = ['Pending', 'Completed', 'Cancelled'];


  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private core: CoreService,
    private dialog: MatDialogRef<TaskCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
     this.tasksForm = this.fb.group({
      taskName: [''],
      taskDescription: [''],
      date: [''],
      status: [''], 
  })
}
 
  ngOnInit(): void {
      this.tasksForm.patchValue(this.data)
  }

  onSubmit() {
    if (this.tasksForm.valid) {
      if(this.data){
        this.taskService.updateTask(this.data.id, this.tasksForm.value).subscribe({
          next: (val: any) => {
            this.core.openSnackBar('Task updated successfully'); 
            this.dialog.close(true);
          },
          error: (err: any) => {console.error(err);
          }
         })
      }
      else{
        this.taskService.addTask(this.tasksForm.value).subscribe({
          next: (val: any) => {
            this.core.openSnackBar('Task added successfully', 'done'); 

            this.dialog.close(true);
          },
          error: (err: any) => {console.error(err);
          }
         })
      }
     
    }
  }
}
