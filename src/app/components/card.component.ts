import {Component, Input, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormBuilder,FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {BBCard} from '../interfaces/bbcard';
import { CardsService } from '../services/cards.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { EditDialogCardComponent } from './card-dialog-edit.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'bb-card',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatIconModule, MatTooltipModule],
  template: `
    <section class="card-container lgc-{{bbCard.color}}">
      <h3 class="card-title" (click)="openEditDialog(bbCard)" *ngIf="bbCard" class="lgc-{{bbCard.color}}" cdkDragHandle>
        {{ bbCard.title }}
      </h3>
      
      <p class="card card-text" 
        (click)="openEditDialog(bbCard)" *ngIf="bbCard.description"
         style="cursor: pointer;"
         class="lgc-{{bbCard.color}}"
        >
        {{ bbCard.description | slice:0:200 }}<span *ngIf="bbCard.description.length > 200"  matTooltip="{{bbCard.description}}">...</span>
      </p>
      
      <div class="card card-meta-container">
        <div class="card-meta" matTooltip="ID" matTooltipPosition="above">
        <span class="material-icons md-12">tag</span>{{ bbCard.id }}</div>
          
        <div class="card-meta" matTooltip="Created: {{bbCard.created}}" matTooltipPosition="above">
          <span class="material-icons md-12">save</span>  
        </div>

        <div class="card-meta" matTooltip="Modified: {{bbCard.updated}}" matTooltipPosition="above">
          <span class="material-icons md-12">edit</span>
        </div>
      </div>

      <div class="card-footer-container">

        <button mat-button color="primary" (click)="openEditDialog(bbCard)">
        <mat-icon>edit</mat-icon>Edit card</button>

        <button mat-button color="primary" (click)="openDeleteDialog(bbCard)">
        <mat-icon>delete</mat-icon>Delete card</button>

        <div *ngIf="showDeleteDialog" class="overlay" (click)="showDeleteDialog = false">
        <div class="dialog-box" style="color: black;" (click)="$event.stopPropagation()">
          <p>Delete card?</p>
          <br><br>
          <button (click)="deleteCard(bbCard)" class="btn-red">Delete</button>
          &nbsp;
          <button (click)="showDeleteDialog = false">Cancel</button>
        </div>
    </div>

      </div>

     </section>
 
  `,
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {  @Input() bbCard!: BBCard;
  /**You have to add the ! because the input is expecting the value to be passed. 
   * In this case, there is no default value. In our example application case we know that the value will be passed in - this is by design. 
   * The exclamation point is called the non-null assertion operator and it tells the TypeScript compiler that the value of this property won't be null or undefined. */
  
  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  cardsService: CardsService = inject(CardsService);
  
  ngOnInit() {   
  }

  toggleDescription(card: any): void {
    card._showDescription = !card._showDescription;
  }

  openEditDialog(card: BBCard ) 
  {
    const dialogRef = this.dialog.open(EditDialogCardComponent, {
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
        // Handle the updated card
        this.bbCard = Object.assign({}, updatedCard);
      } 
    });
  }

  showDeleteDialog = false; // Boolean to toggle the dialog

  openDeleteDialog(card: BBCard){
    this.showDeleteDialog=true;
  }

  deleteCard(card: BBCard){
    this.showDeleteDialog=false;
    this.cardsService.delete(card.id);
  }
  
}
