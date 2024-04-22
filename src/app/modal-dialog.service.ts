import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class ModalDialogService {
  constructor(private matDialog: MatDialog) { }

  openConfirmDialog(){
    this.matDialog.open(ConfirmDialogComponent, {
      
    })
  }
}
