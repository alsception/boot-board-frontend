import { Component , inject, HostListener} from "@angular/core";
import { CommonModule } from "@angular/common";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

@Component({
  selector: "app-home-pattern",
  imports: [CommonModule, DragDropModule, MatDialogModule],
  template: `
    <section class="results board-container">
        <div class="xard-grid">
      <div *ngFor="let number of numbers" [class]="'custom-pattern ptn-' + number" class="xard">
         <p style="color: greenyellow;background: black;width: min-content;">&nbsp;{{ number }}&nbsp;</p>
       </div>
    </div> 
    </section>
  `,
  styleUrls: ["./home.component.css"],
})
export class HomePatternComponent 
{
  numbers: number[] = [];
  constructor(private dialog: MatDialog) {
    this.numbers = Array.from({ length: 60 }, (_, i) => i + 1); // Generate an array from 1 to 60    
  }
}
