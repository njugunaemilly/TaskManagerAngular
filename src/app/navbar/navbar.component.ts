import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskCreateComponent } from '../task-create/task-create.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private dialog: MatDialog){}

  openTasksForm(){
    this.dialog.open(TaskCreateComponent);
  }
}
