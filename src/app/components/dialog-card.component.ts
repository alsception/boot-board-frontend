import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {BBCard} from '../interfaces/bbcard';

@Component({
  selector: 'dialog-card',
  imports: [MatDialogModule],
  template: `
     <h1 mat-dialog-title>{{ data.title }}</h1>
     <section class="card-container">
      <h3 class="card-title">{{ data.title }}</h3>
      <br>
     <!--  <form [formGroup]="editCardForm" (submit)="submitCard()">
          <input id="title" type="text" class="input-group__input" formControlName="title" />
          <button type="submit" class="primary hidden">Save</button>
        </form> -->
      <br>
      <p class="card card-text">{{ data.description }}</p>

      <div class="card card-meta-container">
        <div class="card-meta">ID: {{ data.id }}</div>
        <div class="card-meta">Created: <br>{{ data.created }}</div>
        <div class="card-meta">Updated: <br>{{ data.updated }}</div>
        <div class="card-meta hidden">user id: {{ data.userId }}</div>
        <div class="card-meta hidden">listId: {{ data.listId }}</div>      
        <div class="card-meta hidden">COLOR: {{ data.color }}</div>
        <div class="card-meta hidden">POSITION: {{ data.position }}</div>
      </div>
     </section>

    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
  styles: []
})
export class DialogCardComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: BBCard) {}
}
