import { Component , inject, HostListener, Renderer2} from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardsService } from '../services/boards.service';
import { BBBoard } from "../interfaces/bbboard";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { BoardComponentPreview } from "./board.component.preview";
import { AddDialogBoardComponent } from './board-dialog-add.component';

@Component({
  selector: "app-home",
  imports: [CommonModule, DragDropModule, MatDialogModule, BoardComponentPreview],
  template: `
    <section>
      <form>
        <!--
        By binding to the click event on the button element, you are able to call the filterResults function. 
        The argument to the function is the value property of the filter template variable. 
        Specifically, the .value property from the input HTML element.      
        -->
        <input type="text" placeholder="Search lists / boards" #filter 
        (keydown.enter)="onEnter($event, filter.value)"
        />
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
          style="cursor: pointer;margin-left:50px"
          type="button"
          (click)="createBoard()"
        >Create board
        </button>    
      </form>
    </section>
    <section class="results board-container">
    <ng-container *ngIf="filteredBoards.length > 0; else noResults">
     <app-board-preview class="draggable-item bb-list"
        *ngFor="let board of filteredBoards"
        [bbBoard]="board"
      ></app-board-preview>
      </ng-container>
    </section>
    <!-- Define the "no results" template -->
    <ng-template #noResults>
      <div class="no-results-message">
        No boards found. Please try a different search or
        <a (click)="createBoard()"
        class="link">create a new board</a>.
      </div>
    </ng-template>
  `,
  styleUrls: ["./home.component.css"],
})
export class HomeComponent 
{
  boards: BBBoard[] = []; 
  boardsService: BoardsService = inject(BoardsService); 
  filteredBoards: BBBoard[] = [];
  numbers: number[] = [];

  constructor(
    private dialog: MatDialog,
    private renderer: Renderer2)
    {
      this.resetBodyBackground();
      
      this.numbers = Array.from({ length: 60 }, (_, i) => i + 1); // Generate an array from 1 to 60
      this.boardsService
        .getAllBoards()
        .then((xboards: BBBoard[]) => {
          this.boards = xboards;
          this.filteredBoards = xboards;
        });
  }

  onSearch(event: Event) {
    event.preventDefault(); // Prevent form submission
  }

  // Method to handle Enter key
  onEnter(event: Event, inputValue: string): void {
    event.preventDefault(); // Prevent form submission or page refresh
    this.filterResults(inputValue); // Call your search logic
  }

  filterResults(text: string) 
  {
    if (!text) {
      this.filteredBoards = this.boards;
      return;
    }
  
    this.filteredBoards = this.boards.filter((board) => {
      // Check if the board title matches the search text
      const boardTitleMatches = board?.title.toLowerCase().includes(text.toLowerCase());
  
      // Check if the board id matches the search text (convert id to string for comparison)
      const boardIdMatches = board?.id.toString().includes(text);
  
      // Include the board if either the title or id matches the search text
      return boardTitleMatches || boardIdMatches;
    });
  }
    
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    // Check for the key combination (Ctrl + Shift + K)
    if (event.ctrlKey && event.shiftKey && event.key === 'X') {
      console.log('Ctrl + Shift + K was pressed!');
      //this.toggleCards();
    }
  }
  
  //TODO:
  //1. show smthng when no data fetched
  //2. hide empty lists

  createBoard(): void{    
    //Now here we need new object of type BBBoard with listId set:
    const newBBBoard: BBBoard = {
      id: 0,
      userId: 1,//For now everything is same user
      title: this.getBoardNumber()+"Sample board",
      color: "",
      type: "",
      position: 0,
      created: new Date(), // Optional: Add if needed
    };

    const dialogRef = this.dialog.open(AddDialogBoardComponent, {
      data: newBBBoard,
      autoFocus: false, // Prevent Angular Material from focusing the default element
      panelClass: 'custom-list-dialog-container',
      width: '800px',  // Adjust this to control width
      height: 'auto', // Adjust this to control height
      maxWidth: '100%', // Optional, ensures it doesn't exceed the viewport
    });

    console.log('creating list');

    // Handle the dialog close event, subscribe to afterClosed()
    dialogRef.afterClosed().subscribe((addedList: BBBoard | undefined) => {
      if (addedList) {
        // Ensure list.lists is initialized as an array
        if (!this.boards) {
          this.boards = [];
        }
        // Add the addedList to the list.lists array
        this.boards.push(addedList);
      } 
    });
  }

  getBoardNumber() {
    //Here we provide some kind of unique numbering to be used as index for card

    const today = new Date();

    // Get the day, month, and year
    const day = String(today.getDate()).padStart(2, '0');  // Add leading zero if needed
    const month = String(today.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed
    const year = String(today.getFullYear()).slice(-2);  // Get last two digits of the year

    // Get the length of the lists array (ensure it's a 3-digit number)
    const num = this.boards?.length ?? 0;
    const formattedNum = String(num).padStart(3, '0');  // Format num as 3 digits

    // Format as "000num-DDMM-YY-"
    return `B${formattedNum}-${day}${month}-${year} | `;
  }

  resetBodyBackground(){
    this.removeAllClassesFromBody();
    this.addClassToBody("mat-typography")
  }

  addClassToBody(className: string): void {
    this.renderer.addClass(document.body, className);
  }

  removeAllClassesFromBody(): void {
    const classList = Array.from(document.body.classList);
    classList.forEach(className => {
      this.renderer.removeClass(document.body, className);
    });
  }

}
