import {Component, Input, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormBuilder,FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {BBCard} from '../interfaces/bbcard';
import { CardsService } from '../services/cards.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogCardComponent } from '../components/dialog-card.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'bb-card',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <section class="card-container">
      <h3 class="card-title">{{ bbCard.title }}</h3>

      <form [formGroup]="editCardForm" (submit)="submitCard()">
          <input id="title" type="text" class="input-group__input hidden" formControlName="title" />
          <button type="submit" class="primary hidden">Save</button>
        </form>

      <p class="card card-text" *ngIf="true">{{ bbCard.description }}</p>
      
      <button class="toggle-text-btn hidden" (click)="toggleDescription(bbCard)">
        {{ bbCard._showDescription ? 'Hide' : 'Show' }} Description
      </button>

      <div class="card card-meta-container">
        <div class="card-meta">
        <span class="material-icons md-12">tag</span>{{ bbCard.id }}</div>
          
        <div class="card-meta">
          <span class="material-icons md-12">save</span>  
          {{ bbCard.created }}
        </div>
        <div class="card-meta">
          <span class="material-icons md-12">edit</span>
          {{ bbCard.updated }}
        </div>
      </div>

      <div class="card-footer-container">

        <button mat-button color="primary" (click)="openEditDialog(bbCard)">
        <mat-icon>edit</mat-icon>Edit card</button>

        <button mat-button color="primary" (click)="openEditDialog(bbCard)">
        <mat-icon>delete</mat-icon>Delete card</button>
      </div>

     </section>
 
  `,
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {  @Input() bbCard!: BBCard;
  /**You have to add the ! because the input is expecting the value to be passed. 
   * In this case, there is no default value. In our example application case we know that the value will be passed in - this is by design. 
   * The exclamation point is called the non-null assertion operator and it tells the TypeScript compiler that the value of this property won't be null or undefined. */
  
  //Define card form forsending data to server
  editCardForm = new FormGroup({
    title: new FormControl(""),
    description: new FormControl(""),
     //position: new FormControl(""),
   });

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  cardsService: CardsService = inject(CardsService);
  
  ngOnInit() {
    // Initialize the form with all required controls
    this.editCardForm = new FormGroup({
      title: new FormControl(this.bbCard?.title || null),
      description: new FormControl(this.bbCard?.description || null),
      //position: new FormControl(this.bbCard?.position || null)
     });
  }

  toggleDescription(card: any): void {
    card._showDescription = !card._showDescription;
  }
  
  async submitCard() {
    try {
      const editedCard =  Object.assign({}, this.bbCard);
      editedCard.description = this.editCardForm.value.description ?? "";
      editedCard.title = this.editCardForm.value.title ?? "";
      const updatedCard = await this.cardsService.updateCard(editedCard); // Fetch updated card
      this.bbCard = Object.assign({}, updatedCard); // Safely assign to bbCard
    } catch (error) {
      console.error('Failed to update card:', error);
    }
  }

  openEditDialog(card: BBCard ) {
    const dialogRef = this.dialog.open(DialogCardComponent, {
      data: card,     
      autoFocus: false, // Prevent Angular Material from focusing the default element
      panelClass: 'custom-card-dialog-container',
      width: '800px',  // Adjust this to control width
      height: '700px', // Adjust this to control height
      maxWidth: '100%', // Optional, ensures it doesn't exceed the viewport
    });

    // Handle the dialog close event
    // Subscribe to afterClosed()
    dialogRef.afterClosed().subscribe((updatedCard: BBCard | undefined) => {
      if (updatedCard) {
        console.log('Dialog closed with updated card:', updatedCard);
        // Handle the updated card
        //this.updateCardInList(updatedCard); // Example: Updating your local list
        this.bbCard = Object.assign({}, updatedCard);
      } else {
        console.log('Dialog was closed without saving changes.');
      }
    });
  }
  
}
