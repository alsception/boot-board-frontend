import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BBList} from '../interfaces/bblist';
import {BBCard} from '../interfaces/bbcard';
import {CardComponent} from '../components/card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@Component({
  selector: 'bb-list',
  imports: [CommonModule, RouterModule, CardComponent, DragDropModule],
  template: `
    <section class="listing listing-container">
      <h2 class="listing-heading">{{ bbList.title }}</h2>
      <div class="listing listing-meta-container ">
        <p class="listing-meta">ID: {{ bbList.id }}</p>
        <p class="listing-meta hidden">user id: {{ bbList.userId }}</p>
        <p class="listing-meta hidden">board id: {{ bbList.boardId }}</p>
        
        <p class="listing-meta hidden">COLOR: {{ bbList.color }}</p>
        <p class="listing-meta hidden">POSITION: {{ bbList.position }}</p>
      </div>

      <p class="listing">Cards: {{ bbList.cards?.length }}</p>
      <a [routerLink]="['/lists', bbList.id]">Learn More</a>
      <section class="cardsResults">
        <!-- add this directive to make it draggable: cdkDrag -->
<!--         class="draggable-item"         
 -->        <bb-card  
          *ngFor="let xCard of bbList.cards"
          [bbCard]="xCard"
        ></bb-card>
      </section>
      <div class="listing-container"></div>
    </section>
  `,
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  @Input() bbList!: BBList;
  /**You have to add the ! because the input is expecting the value to be passed. 
   * In this case, there is no default value. In our example application case we know that the value will be passed in - this is by design. 
   * The exclamation point is called the non-null assertion operator and it tells the TypeScript compiler that the value of this property won't be null or undefined. */
}
