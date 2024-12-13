import { Component, Inject,inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BBList } from '../interfaces/bblist';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ListsService } from '../services/lists.service';
import { MatDialogRef } from '@angular/material/dialog';
import { HostListener } from '@angular/core';


@Component({
  selector: 'dialog-list-add',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  template: `
  <h1 mat-dialog-title class="list-dialog-title">Add List</h1>
  <section class="dlg-list-container">
    <form
      [formGroup]="addListForm"
      (ngSubmit)="submitList()"
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
        <div class="metadata-item">
          <label for="boardId">Board ID</label>
          <input
            id="boardId"
            type="number"
            class="form-input"
            formControlName="boardId"
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
  <!-- 
        <div class="metadata-item-100">
          <label for="description">Description</label>
          <textarea
            id="description"
            class="form-input"
            formControlName="description"
            #description
          ></textarea>
        </div>
        </div>-->
      </div> 
  
      <div class="metadata-container">
        <div class="metadata-item">
          <label for="color">Color</label>
          <input
            id="color"
            type="text"
            class="form-input"
            formControlName="color"
          />
        </div>
  
        <div class="metadata-item">
          <label for="type">Type</label>
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
      [disabled]="addListForm.invalid"
      (click)="submitList()"
    >
      Save
    </button>
  </div>
  `,
  styleUrls: ['./card.component.css'],
})
export class AddDialogListComponent implements AfterViewInit  
{
  addListForm: FormGroup;
  listsService: ListsService = inject(ListsService);

  @ViewChild('title') titleField!: ElementRef;

  ngAfterViewInit(): void {
    // Focus the title field when the dialog opens
    try {
      this.titleField.nativeElement.focus();  
    } catch (error) {
      console.log('could not focus title field',error);
    }   

  }

  constructor(
    private dialogRef: MatDialogRef<AddDialogListComponent>, // Inject MatDialogRef
    @Inject(MAT_DIALOG_DATA) public data: BBList) 
  {    
    this.addListForm = new FormGroup(
      {
        id: new FormControl(data?.id || null), // Initialize with data or default to null
        userId: new FormControl(data?.userId || null),
        boardId: new FormControl(data?.boardId || null),
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
        ),
      });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'Enter') {
      this.submitList();
    }
  }

  async submitList() {
    console.log("updlist> ",this.getUpdatedList())
    try {
      const addedList =  Object.assign({}, this.getUpdatedList());
      console.log("eddlist> ",addedList)
      
      const updatedList = await this.listsService.insertList(addedList); // Fetch updated list
      this.data = Object.assign({}, updatedList); // Safely assign to bbList


      // Close dialog here
      this.dialogRef.close(updatedList); // Use injected dialogRef
    } catch (error) {
      console.error('Failed to update list:', error);
    }
  }
  // Optional: Method to get the updated BBList object from the form
  getUpdatedList(): BBList {
    return this.addListForm.value as BBList;
  }
}
