import {Component, Input, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BBList} from '../interfaces/bblist';
import {BBCard} from '../interfaces/bbcard';
import {CardComponent} from '../components/card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListsService } from '../services/lists.service';


@Component({
  selector: 'bb-list',
  imports: [CommonModule, RouterModule, CardComponent, DragDropModule],
  template: `
    <section class="listing-dark listing-container listing-nb">
    <button class="btn btn-red up-right" (click)="showDeleteDialog(bbList.id)">&nbsp;X&nbsp;</button>
      
      <h2 class="listing-heading-dark">{{ bbList.title }} </h2>
     
      <section class="cardsResults">
        <!-- add this directive to make it draggable: cdkDrag -->
<!--         class="draggable-item"         
 -->        <bb-card  
          *ngFor="let xCard of bbList.cards"
          [bbCard]="xCard"
        ></bb-card>
      </section>
      <p class="listing-dark">Total cards: {{ bbList.cards?.length }}</p>
      <div class="listing-dark listing-meta-container ">
      
        <p class="listing-meta blue">ID: {{ bbList.id }}</p>
        <div class="listing-meta blue listing-dark">Created: {{ bbList.created }}</div>
        <p class="listing-meta hidden">user id: {{ bbList.userId }}</p>
        <p class="listing-meta hidden">board id: {{ bbList.boardId }}</p>
        
        <p class="listing-meta hidden">COLOR: {{ bbList.color }}</p>
        <p class="listing-meta hidden">POSITION: {{ bbList.position }}</p>
      </div>

      
      <!-- <a [routerLink]="['/lists', bbList.id]">Learn More</a> -->
      <div class="listing-container"></div>
    </section>
    
    <div *ngIf="showDialog" class="overlay" (click)="showDialog = false">
      <div class="dialog-box" (click)="$event.stopPropagation()">
        <p>Delete list?</p>
        <button (click)="deleteList(bbList.id)">Delete</button>
        &nbsp;
        <button (click)="showDialog = false">Cancel</button>
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
  
  showDialog = false; // Boolean to toggle the dialog

  listsService: ListsService = inject(ListsService);
  
  showDeleteDialog(id: number){
    this.showDialog=true;
    console.log('Button clicked! ' + id);
  }
  deleteList(id: number){
    this.showDialog=false;
    console.log('deleteList! ' + id);
    this.listsService.delete(id);
  }
}
