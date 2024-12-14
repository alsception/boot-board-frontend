import { Component , inject, HostListener, Input} from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardsService } from '../services/boards.service';
import { BBBoard } from "../interfaces/bbboard";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import {RouterModule} from '@angular/router';
import { AddDialogListComponent } from './list-dialog-add.component';

@Component({
  selector: "app-board-preview",
  imports: [CommonModule, DragDropModule, MatDialogModule, RouterModule],
  template: `
    <section
      class="listing listing-container listing-nb lg-{{ bbBoard.color }}"
    >
      <div
        style="container"
        [routerLink]="['/board', bbBoard.id]"
        class="board-clickable-div container"
        role="button"
        tabindex="0"
      >
        <h2 class="board-listing-heading listing-heading ">
          {{ bbBoard.title }}
        </h2>
        <div style="display: flex; ">
          <div style="width: 50%;">
            <h3 class="board-listing-heading listing-heading ">Total lists</h3>
            <h1 class="board-listing-heading listing-heading ">53</h1>
          </div>
          <div style="width: 50%;">
            <h3 class="board-listing-heading listing-heading ">Total cards</h3>
            <h1 class="board-listing-heading listing-heading ">1070</h1>
          </div>
        </div>

        <div class="listing-meta-container">
          <div class="listing-meta " matTooltip="ID" matTooltipPosition="above">
            <span class="material-icons md-12">key</span>
            {{ bbBoard.id }}
          </div>
          <div
            class="listing-meta "
            matTooltip="Position"
            matTooltipPosition="above"
          >
            <span class="material-icons md-12">tag</span>
            {{ bbBoard.position }}
          </div>
          <div
            class="listing-meta "
            matTooltip="Created"
            matTooltipPosition="above"
          >
            <span class="material-icons md-12">save</span>
            {{ bbBoard.created }}
          </div>
          <div class="listing-meta">
            <span class="material-icons md-12">functions</span>
            <span class="material-icons md-12">summarize</span>
            {{ bbBoard.lists?.length }}
          </div>
        </div>
      </div>

      <!--       </a>  
 -->
    </section>
  `,
  styleUrls: ["list.component.css"],
})
export class BoardComponentPreview {
  @Input() bbBoard!: BBBoard;

  boards: BBBoard[] = [];

  boardsService: BoardsService = inject(BoardsService);

  filteredBoards: BBBoard[] = []; /* 
  filteredCards: BBCard[] = [];
  filteredLists: BBList[] = []; */

  constructor(private dialog: MatDialog) {
    console.log("initilized board preview component", this.bbBoard);

    this.boardsService.getAllBoards().then((xboards: BBBoard[]) => {
      this.boards = xboards;
      this.filteredBoards = xboards;
    });
  }

  filterResults(text: string) {
    //Se no xe cerca -> mostri tutto
    if (!text) {
      this.filteredBoards = this.boards;
      return;
    }
    this.filteredBoards = this.boards.filter((board) => {
      // Check if the list title matches the search text
      const listTitleMatches = board?.title
        .toLowerCase()
        .includes(text.toLowerCase());

      // Check if any card's title matches the search text
      /* const cardTitleMatches = list?.cards?.some((card) =>
        card.title.toLowerCase().includes(text.toLowerCase())
      ); */

      // The list is included if either the list title or any card's title matches
      return listTitleMatches /* || cardTitleMatches*/;
    });
    /**
     * This function uses the String filter function to compare the value of the text parameter against the housingLocation.city property.
     * You can update this function to match against any property or multiple properties for a fun exercise.
     */
  }

  @HostListener("window:keydown", ["$event"])
  handleKeyDown(event: KeyboardEvent): void {
    // Check for the key combination (Ctrl + Shift + K)
    /*  if (event.ctrlKey && event.shiftKey && event.key === 'X') {
        console.log('Ctrl + Shift + K was pressed!');
        this.toggleCards();
      } */
  }

  //TODO:
  //1. show smthng when no data fetched
  //2. hide empty lists
  /* 
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
    } */
  /* 
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
    } */

  //create board
  createBoard(boardId: number): void {
    //open dialog
    /* 
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
        }); */
  }

  toggleDarkMode(): void {
    console.log("toggleDarkMode");
  }

  toggleGridView(): void {
    //todo
    /* onst results = document.querySelectorAll('.results').setStyle("","");

      results.forEach((element: HTMLElement) => {
        this.renderer.setStyle(element, 'display', 'grid');
        this.renderer.setStyle(element, 'gap', '16px');
        this.renderer.setStyle(element, 'grid-template-columns', 'repeat(auto-fit, minmax(200px, 1fr))');
      }); */
  }
}
