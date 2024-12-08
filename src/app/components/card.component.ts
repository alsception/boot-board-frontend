import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BBCard} from '../interfaces/bbcard';

@Component({
  selector: 'bb-card',
  imports: [CommonModule, RouterModule],
  template: `
    <section class="card-container">
      <h2 class="card-title">{{ bbCard.title }}</h2>
      <p class="card card-text">{{ bbCard.text }}</p>
      <div class="card card-meta-container">
        <div class="card-meta">ID: {{ bbCard.id }}</div>
        <div class="card-meta">user id: {{ bbCard.userId }}</div>
        <div class="card-meta">listId: {{ bbCard.listId }}</div>      
        <div class="card-meta">COLOR: {{ bbCard.color }}</div>
        <div class="card-meta">POSITION: {{ bbCard.position }}</div>
     </div>
<!--       <a [routerLink]="['/lists', bbCard.id]">Learn More</a>
 -->    </section>
  `,
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() bbCard!: BBCard;
  /**You have to add the ! because the input is expecting the value to be passed. 
   * In this case, there is no default value. In our example application case we know that the value will be passed in - this is by design. 
   * The exclamation point is called the non-null assertion operator and it tells the TypeScript compiler that the value of this property won't be null or undefined. */
}
