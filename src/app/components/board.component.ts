import { Component , inject, HostListener} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListComponent } from "./list.component"
import { ListsService } from '../services/lists.service';
import { CardsService } from '../services/cards.service';
import { BoardsService } from '../services/boards.service';
import { BBBoard } from "../interfaces/bbboard";
import { BBCard } from "../interfaces/bbcard";
import { BBList } from "../interfaces/bblist";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AddDialogListComponent } from './list-dialog-add.component';

@Component({
  selector: "app-board",
  imports: [CommonModule, ListComponent, DragDropModule, MatDialogModule],
  template: `
    <section>
      <form>
        <!--
        By binding to the click event on the button element, you are able to call the filterResults function. 
        The argument to the function is the value property of the filter template variable. 
        Specifically, the .value property from the input HTML element.      
        -->
        <input type="text" placeholder="Search cards / lists / boards" #filter />
        <button
          class="primary"
          type="button"
          style="cursor: pointer;margin-right: 50px;"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
        &nbsp;&nbsp;
        <button
          class="primary"
          style="cursor: pointer;"
          type="button"
          (click)="toggleCards()"
        >Toggle cards
        </button>
        &nbsp;&nbsp;
        <button
          class="primary"
          style="cursor: pointer;"
          type="button"
          (click)="toggleLists()"
        >Toggle lists
        </button>
        &nbsp;&nbsp;
        <button
          class="primary"
          style="cursor: pointer;margin-left:50px"
          type="button"
          (click)="createList(1)"
        >Create list
        </button>
        <button
          class="primary"
          style="cursor: pointer;margin-left:50px"
          type="button"
          (click)="toggleDarkMode()"
        >Toggle dark mode
        </button>
        <button
          class="primary"
          style="cursor: pointer;margin-left:50px"
          type="button"
          (click)="toggleGridView()"
        >Toggle grid view
        </button>
      </form>

      <!-- test input -->
      <div class="container hidden">
        <div class="input-group">
          <label class="input-group__label" for="myInput">Input test</label>
          <input type="text" id="myInput" class="input-group__input" value="This is my input">
        </div>
      </div>

    </section>
    <section class="results">
<!--     add this to bb-list cdkDrag
 -->      <bb-list cdkDrag class="draggable-item bb-list"
        *ngFor="let xList of filteredLists"
        [bbList]="xList"
      ></bb-list>
    </section>
  `,
  styleUrls: ["board.component.css"],
})
export class BoardComponent {  

  boards: BBBoard[] = [];
  cards: BBCard[] = [];
  lists: BBList[] = [];

  listsService: ListsService = inject(ListsService);
  boardsService: BoardsService = inject(BoardsService);
  cardsService: CardsService = inject(CardsService);

  filteredBoards: BBBoard[] = [];
  filteredCards: BBCard[] = [];
  filteredLists: BBList[] = [];

  constructor(private dialog: MatDialog) {
    console.log("initilized board component")
    this.listsService
      .getAllListsWithCards()
      .then((xList: BBList[]) => {
        this.lists = xList;
        this.filteredLists = xList;
      });
  }

  filterResults(text: string) {
    //Se no xe cerca -> mostri tutto
    if (!text) {
      this.filteredLists = this.lists;
      return;
    }
    this.filteredLists = this.lists.filter((list) => {
      // Check if the list title matches the search text
      const listTitleMatches = list?.title.toLowerCase().includes(text.toLowerCase());
    
      // Check if any card's title matches the search text
      const cardTitleMatches = list?.cards?.some((card) =>
        card.title.toLowerCase().includes(text.toLowerCase())
      );
    
      // The list is included if either the list title or any card's title matches
      return listTitleMatches || cardTitleMatches;
    });
    /**
     * This function uses the String filter function to compare the value of the text parameter against the housingLocation.city property.
     * You can update this function to match against any property or multiple properties for a fun exercise.
     */
  }  

  
    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent): void {
      // Check for the key combination (Ctrl + Shift + K)
      if (event.ctrlKey && event.shiftKey && event.key === 'X') {
        console.log('Ctrl + Shift + K was pressed!');
        this.toggleCards();
      }
    }
    
    //TODO:
    //1. show smthng when no data fetched
    //2. hide empty lists

    isHiddenCardDescription = false;
    toggleCards(): void {
      //Hide cards description, show only title
      const cards = document.querySelectorAll('.card, .card-footer-container, .card-text, .card-meta-container');
            this.isHiddenCardDescription = !this.isHiddenCardDescription; // Toggle state
  
      cards.forEach(card => {
        if (this.isHiddenCardDescription) {
          card.classList.add('hidden'); // Add the 'hidden' class
        } else {
          card.classList.remove('hidden'); // Remove the 'hidden' class
        }
      });
  
      console.log(`Hidden class is now ${this.isHiddenCardDescription ? 'applied' : 'removed'}`);
    }

    isHiddenCards = false;
    toggleLists(): void {
      //Hide all cards completely
      const cards = document.querySelectorAll('bb-card');
            this.isHiddenCards = !this.isHiddenCards; // Toggle state
  
      cards.forEach(card => {
        if (this.isHiddenCards) {
          card.classList.add('hidden'); // Add the 'hidden' class
        } else {
          card.classList.remove('hidden'); // Remove the 'hidden' class
        }
      });
  
      console.log(`Hidden class is now ${this.isHiddenCards ? 'applied' : 'removed'}`);
    }

    createList(boardId: number): void{
      //open dialog

        //Now here we need new object of type BBList with listId set:
        const newBBList: BBList = {
          id: 0,
          userId: 1,
          boardId: boardId,  
          title: "Sample title",
          color: "",
          type: "",  
          position: 0,
          created: new Date(), // Optional: Add if needed
        };
    
        const dialogRef = this.dialog.open(AddDialogListComponent, {
          data: newBBList,     
          autoFocus: false, // Prevent Angular Material from focusing the default element
          panelClass: 'custom-list-dialog-container',
          width: '800px',  // Adjust this to control width
          height: '500px', // Adjust this to control height
          maxWidth: '100%', // Optional, ensures it doesn't exceed the viewport
        });
    
        // Handle the dialog close event, subscribe to afterClosed()
        dialogRef.afterClosed().subscribe((addedList: BBList | undefined) => {
          if (addedList) 
            {
            // Ensure list.lists is initialized as an array
            if (!this.lists) {
              this.lists = [];
            }
            // Add the addedList to the list.lists array
            this.lists.push(addedList);
          } else {
            console.log('Dialog was closed without saving changes.');
          }
        });
      }

    toggleDarkMode(): void{
      console.log("toggleDarkMode");
    }

    toggleGridView(): void{
      //todo
      /* onst results = document.querySelectorAll('.results').setStyle("","");

      results.forEach((element: HTMLElement) => {
        this.renderer.setStyle(element, 'display', 'grid');
        this.renderer.setStyle(element, 'gap', '16px');
        this.renderer.setStyle(element, 'grid-template-columns', 'repeat(auto-fit, minmax(200px, 1fr))');
      }); */
    }
  
}
