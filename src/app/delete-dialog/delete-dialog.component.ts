import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  constructor( public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject( MAT_DIALOG_DATA) public data:any){

  }

  noDelete(){ 
    console.log('dnt delete')
    this.dialogRef.close()
  }

  delteConfirmation(){ 
    console.log('delete')
    this.dialogRef.close('delete')
  }

}
