import {Component, Input, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BBList} from '../interfaces/bblist';
import {BBCard} from '../interfaces/bbcard';
import {CardComponent} from '../components/card.component';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ListsService } from '../services/lists.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { EditDialogListComponent } from './list-dialog-edit.component';
import { AddDialogCardComponent } from './card-dialog-add.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'bb-list',
  imports: [CommonModule, RouterModule, CardComponent, DragDropModule, MatDialogModule, MatButtonModule, MatIconModule, MatTooltipModule],
  template: `
    <section class="listing listing-container listing-nb lg-{{bbList.color}}">      
      <h2 class="listing-heading" cdkDragHandle>{{ bbList.title }} </h2>     
      <section class="cardsResults" cdkDropList (cdkDropListDropped)="drop($event)">         
         <bb-card  
          *ngFor="let xCard of bbList.cards"
          [bbCard]="xCard"
          cdkDrag
        ></bb-card>
      </section>
      
      <div class="listing-meta-container">      
        <div class="listing-meta " matTooltip="ID" matTooltipPosition="above"> 
          <span class="material-icons md-12">key</span>
          {{ bbList.id }}
        </div>
        <div class="listing-meta " matTooltip="Position" matTooltipPosition="above">
          <span class="material-icons md-12">tag</span>
          {{ bbList.position }}
        </div>
        <div class="listing-meta " matTooltip="Created" matTooltipPosition="above">
          <span class="material-icons md-12">save</span>  
          {{ bbList.created }}
        </div>
        <div class="listing-meta" matTooltip="Total cards"
          matTooltipPosition="above"
          >
          <span class="material-icons md-12">functions</span>
          <span class="material-icons md-12">summarize</span>
          
          {{ bbList.cards?.length }}
        </div>   
      </div>
      
      <div class="listing-container"></div>

      <button mat-button color="primary" (click)="openAddCardDialog(bbList)">
      <mat-icon>add</mat-icon>Add Card</button>

      <button mat-button color="primary" (click)="openEditDialog(bbList)">
      <mat-icon>edit</mat-icon>Edit list</button> 

      <button mat-button color="primary" (click)="openDeleteDialog(bbList.id)">
        <mat-icon>delete</mat-icon>Delete list
      </button>
    </section>    

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
  @Input()
  bbList!: BBList;
  /**You have to add the ! because the input is expecting the value to be passed. 
   * In this case, there is no default value. In our example application case we know that the value will be passed in - this is by design. 
   * The exclamation point is called the non-null assertion operator and it tells the TypeScript compiler that the value of this property won't be null or undefined. */
  
  showDeleteDialog = false; // Boolean to toggle the dialog

  listsService: ListsService = inject(ListsService);

  constructor(private dialog: MatDialog) {}
 
  openEditDialog(list: BBList ) {
    console.log('opening edit dialog list')
      const dialogRef = this.dialog.open(EditDialogListComponent, {
        data: list,     
        autoFocus: false, // Prevent Angular Material from focusing the default element
        panelClass: 'custom-list-dialog-container',
        width: '800px',  // Adjust this to control width
        height: 'auto', // Adjust this to control height
        maxWidth: '100%', // Optional, ensures it doesn't exceed the viewport
      });
  
      // Handle the dialog close event
      // Subscribe to afterClosed()
      dialogRef.afterClosed().subscribe((updatedList: BBList | undefined) => {
        if (updatedList) {
          console.log('Dialog closed with updated list:', updatedList);
          // Handle the updated list
          this.bbList = Object.assign({}, updatedList);
        } else {
          console.log('Dialog was closed without saving changes.');
        }
      });
    }
  
  openDeleteDialog(id: number){
    this.showDeleteDialog=true;
  }

  deleteList(id: number){
    this.showDeleteDialog=false;
    this.listsService.delete(id);
  }

  getCardNumber() 
  {
    //Here we provide some kind of unique numbering to be used as index for card

    const today = new Date();
    
    // Get the day, month, and year
    const day = String(today.getDate()).padStart(2, '0');  // Add leading zero if needed
    const month = String(today.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed
    const year = String(today.getFullYear()).slice(-2);  // Get last two digits of the year
      
    // Get the length of the cards array (ensure it's a 3-digit number)
    const num = this.bbList.cards?.length ?? 0;
    const formattedNum = String(num).padStart(3, '0');  // Format num as 3 digits

    // Format as "000num-DDMM-YY-"
    return `C${formattedNum}-${day}${month}-${year} | `;
  }

  openAddCardDialog(list: BBList ) 
  {
    //Now here we need new object of type BBCard with listId set:
    const newBBCard: BBCard = {
      id: 0,
      userId: 1,
      listId: list.id,  
      title: this.getCardNumber()+"Sample title",
      description: "Sample description...",   
      color: "",
      type: "",  
      position: list.cards?.length ?? 0,
      created: new Date(), // Optional: Add if needed
    };

    const dialogRef = this.dialog.open(AddDialogCardComponent, {
      data: newBBCard,     
      autoFocus: false, // Prevent Angular Material from focusing the default element
      panelClass: 'custom-card-dialog-container',
      width: '800px',  // Adjust this to control width
      height: 'auto', // Adjust this to control height
      maxWidth: '100%', // Optional, ensures it doesn't exceed the viewport
    });

    // Handle the dialog close event, subscribe to afterClosed()
    dialogRef.afterClosed().subscribe((addedCard: BBCard | undefined) => {
      if (addedCard) 
        {
        // Ensure list.cards is initialized as an array
        if (!list.cards) {
          list.cards = [];
        }
        // Add the addedCard to the list.cards array
        list.cards.push(addedCard);
      } else {
        console.log('Dialog was closed without saving changes.');
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event)
    moveItemInArray(this.bbList.cards ?? [], event.previousIndex, event.currentIndex);
    console.log(this.bbList.cards);
    //TODO:
    //update positions to server
  }
}
