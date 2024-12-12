import {Component, Input, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BBList} from '../interfaces/bblist';
import {BBCard} from '../interfaces/bbcard';
import {CardComponent} from '../components/card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListsService } from '../services/lists.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogCardComponent } from '../components/dialog-card.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'bb-list',
  imports: [CommonModule, RouterModule, CardComponent, DragDropModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <section class="listing listing-container listing-nb lg-{{bbList.color}}">      
      <h2 class="listing-heading">{{ bbList.title }} </h2>     
      <section class="cardsResults">
        <!-- add this directive to make it draggable: cdkDrag -->
        <!-- class="draggable-item"    -->        
         <bb-card  
          *ngFor="let xCard of bbList.cards"
          [bbCard]="xCard"
        ></bb-card>
      </section>

      
      <div class="listing-meta-container">      
        <div class="listing-meta "> 
          <span class="material-icons md-12">key</span>
          {{ bbList.id }}
        </div>
        <div class="listing-meta ">
          <span class="material-icons md-12">tag</span>
          {{ bbList.position }}
        </div>
        <div class="listing-meta ">
          <span class="material-icons md-12">save</span>  
          {{ bbList.created }}
        </div>
        <div class="listing-meta">
          <span class="material-icons md-12">functions</span>
          <span class="material-icons md-12">summarize</span>
          {{ bbList.cards?.length }}
        </div>
        


      </div>

      <div class="listing-container"></div>

      <button mat-button color="primary" (click)="openDeleteDialog(bbList.id)">
      <mat-icon>add</mat-icon>Add Card</button>
      
      <button mat-button color="primary" (click)="openDeleteDialog(bbList.id)">
      <mat-icon>edit</mat-icon>Edit list</button>

      <button mat-button color="primary" (click)="openDeleteDialog(bbList.id)">
        <mat-icon>delete</mat-icon>Delete list
      </button>
    </section>    

    <!-- Delete dialog -->
    <div *ngIf="showDeleteDialog" class="overlay" (click)="showDeleteDialog = false">
      <div class="dialog-box" (click)="$event.stopPropagation()">
        <p>Delete list?</p>
        <br><br>
        <button (click)="deleteList(bbList.id)" class="btn-red">Delete</button>
        &nbsp;
        <button (click)="showDeleteDialog = false">Cancel</button>
      </div>
    </div>
  `,
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  @Input() bbList!: BBList;
  /**You have to add the ! because the input is expecting the value to be passed. 
   * In this case, there is no default value. In our example application case we know that the value will be passed in - this is by design. 
   * The exclamation point is called the non-null assertion operator and it tells the TypeScript compiler that the value of this property won't be null or undefined. */
  
  showDeleteDialog = false; // Boolean to toggle the dialog

  listsService: ListsService = inject(ListsService);

  constructor(private dialog: MatDialog) {}

  openEditDialog() {
    const person = { name: 'John Doe', age: 30 };
    this.dialog.open(DialogCardComponent, {
      data: person,
    });
  }
  
  openDeleteDialog(id: number){
    this.showDeleteDialog=true;
  }

  deleteList(id: number){
    this.showDeleteDialog=false;
    this.listsService.delete(id);
  }
}
