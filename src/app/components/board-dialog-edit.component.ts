import { Component, Inject,inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BBBoard } from '../interfaces/bbboard';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { BoardsService } from '../services/boards.service';
import { MatDialogRef } from '@angular/material/dialog';
import { HostListener } from '@angular/core';

@Component({
  selector: 'dialog-board-edit',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  template: `
  <h1 mat-dialog-title class="card-dialog-title">Edit Board {{data.id}}</h1>
  <section class="dlg-board-container">
    <form
      [formGroup]="editBoardForm"
      (ngSubmit)="submitBoard()"
      class="form-container"
    >
      <div class="metadata-container">
        <div class="metadata-item">
          <label for="id">ID</label>
          <input
            id="id"
            type="number"
            class="form-input"
            formControlName="id"
            readonly
          />
        </div>
        <div class="metadata-item">
          <label for="userId">User ID</label>
          <input
            id="userId"
            type="number"
            class="form-input"
            formControlName="userId"
            readonly
          />
        </div>       
      </div>
  
      <div class="metadata-container">
        <div class="metadata-item-50">
          <label for="created">Created</label>
          <input
            id="created"
            type="datetime-local"
            class="form-input"
            formControlName="created"
            readonly
          />
        </div>
  
        <div class="metadata-item-50">
          <label for="updated">Updated</label>
          <input
            id="updated"
            type="datetime-local"
            class="form-input"
            formControlName="updated"
            readonly
          />
        </div>
      </div>
  
      <div class="metadata-container">
        <div class="metadata-item-100">
          <label for="title">Title</label>
          <input
            id="title"
            type="text"
            class="form-input dlg-input"
            formControlName="title"
          />
        </div>  
      </div>
  
      <div class="metadata-container">
        <div class="metadata-item">
            <label for="color">Color</label>   
            <select name="color" id="color" class="form-input" formControlName="color">
              <option style="color: violet;" value="violet">violet</option>
              <option style="color: green;" value="green">green</option>
              <option style="color: orange;" value="orange">orange</option>
              <option style="color: blue;" value="blue">blue</option>
              <option style="color: red;" value="red">red</option>
              <option style="color: yellow;background:lightgray;" value="yellow">yellow</option>
              <option style="color: black;" value="black">black</option>
              <option style="color: white;background:lightgray;" value="white">white</option>
            </select>
          </div>
            
        <div class="metadata-item">
          <label for="type">Type (pattern 1-60)</label>
          <input
            id="type"
            type="text"
            class="form-input"
            formControlName="type"
          />
        </div>
  
        <div class="metadata-item">
          <label for="position">Position</label>
          <input
            id="position"
            type="number"
            class="form-input"
            formControlName="position"
          />
        </div>
      </div>
    </form>
  </section>
  
  <!-- Actions -->
  <div mat-dialog-actions>
    <button mat-button type="button" mat-dialog-close>Close</button>
    &nbsp;&nbsp;&nbsp;
    <button
      mat-button
      type="submit"
      [disabled]="editBoardForm.invalid"
      (click)="submitBoard()"
    >
      Save
    </button>
  </div>
  `,
  styleUrls: ['./card.component.css'],//TODO: use some unified styling for dialogs
})
export class EditDialogBoardComponent
{
  editBoardForm: FormGroup;
  boardsService: BoardsService = inject(BoardsService);

  constructor(
    private dialogRef: MatDialogRef<EditDialogBoardComponent>, // Inject MatDialogRef
    @Inject(MAT_DIALOG_DATA) public data: BBBoard) 
  {    
    this.editBoardForm = new FormGroup(
      {
        id: new FormControl(data?.id || null), // Initialize with data or default to null
        userId: new FormControl(data?.userId || null),
        title: new FormControl(data?.title || ""),
        color: new FormControl(data?.color || ""),
        type: new FormControl(data?.type || ""),
        position: new FormControl(data?.position || null),

        // Optional fields
        created: new FormControl(
          data?.created ? data.created : null
        ),
        updated: new FormControl(
          //alternatively we can format like: this.formatDateTime(data.updated) 
          data?.updated ? data.updated : null
        )        
      });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'Enter') {
      this.submitBoard();
    }
  }

  async submitBoard() {
    try {
      const editedBoard =  Object.assign({}, this.getUpdatedBoard());      
      const updatedBoard = await this.boardsService.update(editedBoard); // Fetch updated board
      this.data = Object.assign({}, updatedBoard); // Safely assign to bbBoard
      // Close dialog here
      this.dialogRef.close(updatedBoard); // Use injected dialogRef
    } catch (error) {
      alert('Failed to update board: '+error)
    }
  }

  // Optional: Method to get the updated BBBoard object from the form
  getUpdatedBoard(): BBBoard {
    return this.editBoardForm.value as BBBoard;
  }
}
