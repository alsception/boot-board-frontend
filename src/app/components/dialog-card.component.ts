import { Component, Inject,inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BBCard } from '../interfaces/bbcard';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CardsService } from '../services/cards.service';
import { MatDialogRef } from '@angular/material/dialog';
import { HostListener } from '@angular/core';


@Component({
  selector: 'dialog-card',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  template: `
  <h1 mat-dialog-title class="card-title">Edit Card</h1>
  <section class="dlg-card-container">
    <!-- Form Section -->
    <form
      [formGroup]="editCardForm"
      (ngSubmit)="submitCard()"
      class="form-container"
    >
      <!-- ID and Metadata (Stacked Horizontally) -->
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
          <label for="listId">List ID</label>
          <input
            id="listId"
            type="number"
            class="form-input"
            formControlName="listId"
          />
        </div>
      </div>
  
      <div class="metadata-container">
        <!-- Optional Fields: Created and Updated -->
        <div class="metadata-item-50">
          <label for="created">Created</label>
          <!-- type="date" -->
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
          <!-- Title and Description -->
          <label for="title">Title</label>
          <input
            id="title"
            type="text"
            class="form-input"
            formControlName="title"
          />
        </div>
  
        <div class="metadata-item-100">
          <label for="description">Description</label>
          <textarea
            id="description"
            class="form-input"
            formControlName="description"
            #description
          ></textarea>
        </div>
      </div>
  
      <div class="metadata-container">
        <!-- Color and Type -->
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
          <!-- Position -->
          <label for="position">Position</label>
          <input
            id="position"
            type="number"
            class="form-input"
            formControlName="position"
          />
        </div>
      </div>
  
      <!-- Form Actions -->
      <!-- <div class="form-actions">
        <button type="submit" class="primary-button" [disabled]="editCardForm.invalid">Save</button>
        <button type="button" class="secondary-button" mat-dialog-close>Cancel</button>
      </div> -->
    </form>
  </section>
  
  <!-- Actions -->
  <div mat-dialog-actions>
    <button mat-button type="button" mat-dialog-close>Close</button>
    &nbsp;&nbsp;&nbsp;
    <button
      mat-button
      type="submit"
      [disabled]="editCardForm.invalid"
      (click)="submitCard()"
    >
      Save
    </button>
  </div>
  `,
  styleUrls: ['./card.component.css'],
})
export class DialogCardComponent implements AfterViewInit  
{
  editCardForm: FormGroup;
  cardsService: CardsService = inject(CardsService);

  @ViewChild('description') descriptionField!: ElementRef;

  ngAfterViewInit(): void {
    // Focus the description field when the dialog opens
    this.descriptionField.nativeElement.focus();
  }

  constructor(
    private dialogRef: MatDialogRef<DialogCardComponent>, // Inject MatDialogRef
    @Inject(MAT_DIALOG_DATA) public data: BBCard) 
  {
    console.log(data);
    
    this.editCardForm = new FormGroup(
      {
        id: new FormControl(data?.id || null), // Initialize with data or default to null
        userId: new FormControl(data?.userId || null),
        listId: new FormControl(data?.listId || null),
        title: new FormControl(data?.title || ""),
        description: new FormControl(data?.description || ""),
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
        // Angular-only fields
        _showDescription: new FormControl(data?._showDescription || false),
      });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'Enter') {
      this.submitCard();
    }
  }

  async submitCard() {
    console.log("updcard> ",this.getUpdatedCard())
    try {
      const editedCard =  Object.assign({}, this.getUpdatedCard());
      console.log("eddcard> ",editedCard)
      
      const updatedCard = await this.cardsService.updateCard(editedCard); // Fetch updated card
      this.data = Object.assign({}, updatedCard); // Safely assign to bbCard


      // Close dialog here
      this.dialogRef.close(updatedCard); // Use injected dialogRef
    } catch (error) {
      console.error('Failed to update card:', error);
    }
  }

  // Optional: Method to get the updated BBCard object from the form
  getUpdatedCard(): BBCard {
    return this.editCardForm.value as BBCard;
  }

  private formatDateTime(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    return `${day}.${month}.${year} at ${hours}:${minutes}:${seconds}`;
  }

}
