import { Component , inject, HostListener, Input} from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardsService } from '../services/boards.service';
import { BBBoard } from "../interfaces/bbboard";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AddDialogListComponent } from './list-dialog-add.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditDialogBoardComponent } from "./board-dialog-edit.component";

@Component({
  selector: "app-board-preview",
  imports: [CommonModule, DragDropModule, MatDialogModule, RouterModule, MatTooltipModule, MatIconModule, MatButtonModule],
  template: `
    <section
      class="board listing listing-container listing-nb listing-bb lg-{{ bbBoard.color }}"
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
            <h1 class="board-listing-heading listing-heading ">-</h1>
          </div>
          <div style="width: 50%;">
            <h3 class="board-listing-heading listing-heading ">Total cards</h3>
            <h1 class="board-listing-heading listing-heading ">-</h1>
          </div>
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
            matTooltip="Created: {{bbBoard.created}}"
          >
            <span class="material-icons md-12">save</span>
          </div>
        </div>

        <div class="card-footer-container">

          <button mat-button color="primary" (click)="openEditDialog(bbBoard)">
          <mat-icon>edit</mat-icon>Edit board</button>

          <button mat-button color="primary" (click)="openDeleteDialog(bbBoard)">
          <mat-icon>delete</mat-icon>Delete board</button>

          <div *ngIf="showDeleteDialog" class="overlay" (click)="showDeleteDialog = false">
          <div class="dialog-box" style="color: black;" (click)="$event.stopPropagation()">
            <p>Delete board?</p>
            <br><br>
            <button (click)="deleteBoard(bbBoard)" class="btn-red">Delete</button>
            &nbsp;
            <button (click)="showDeleteDialog = false">Cancel</button>
          </div>
          </div>
      </div>
    </section>
  `,
  styleUrls: ["list.component.css"],
})
export class BoardComponentPreview 
{
  @Input() bbBoard!: BBBoard;

  boards: BBBoard[] = [];
  filteredBoards: BBBoard[] = []; 

  boardsService: BoardsService = inject(BoardsService);

  showDeleteDialog = false; // Boolean to toggle the dialog

  constructor(private dialog: MatDialog) 
  {
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

      // The list is included if either the list title or any card's title matches
      return listTitleMatches /* || cardTitleMatches*/;
    });

  }

  @HostListener("window:keydown", ["$event"])
  handleKeyDown(event: KeyboardEvent): void {
    // Check for the key combination (Ctrl + Shift + K)
    /*  if (event.ctrlKey && event.shiftKey && event.key === 'X') {
        console.log('Ctrl + Shift + K was pressed!');
        this.toggleCards();
      } */
  }
  
  openDeleteDialog(board: BBBoard){
    this.showDeleteDialog=true;
  }

  deleteBoard(board: BBBoard){
    this.showDeleteDialog=false;
    this.boardsService.delete(board.id);
  }

  openEditDialog(board: BBBoard ) 
  {
    const dialogRef = this.dialog.open(EditDialogBoardComponent, {
      data: board,     
      autoFocus: false, // Prevent Angular Material from focusing the default element
      panelClass: 'custom-card-dialog-container',
      width: '800px',  // Adjust this to control width
      height: 'auto', // Adjust this to control height
      maxWidth: '100%', // Optional, ensures it doesn't exceed the viewport
    });

    // Handle the dialog close event
    // Subscribe to afterClosed()
    dialogRef.afterClosed().subscribe((updatedBoard: BBBoard | undefined) => {
      if (updatedBoard) {
        console.log('Dialog closed with updated card:', updatedBoard);
        // Handle the updated card
        this.bbBoard = Object.assign({}, updatedBoard);
      } else {
        console.log('Dialog was closed without saving changes.');
      }
    });
  }

}
