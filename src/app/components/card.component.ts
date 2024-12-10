import {Component, Input, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormBuilder,FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {BBCard} from '../interfaces/bbcard';
import { CardsService } from '../services/cards.service';


@Component({
  selector: 'bb-card',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <section class="card-container">
      <h3 class="card-title-dark">{{ bbCard.title }}</h3>
      <br>
      <form [formGroup]="editCardForm" (submit)="submitCard()">
          <input id="title" type="text" class="input-group__input" formControlName="title" />
          <button type="submit" class="primary hidden">Save</button>
        </form>
      <br>
      <p class="card-dark card-text" *ngIf="bbCard._showDescription">{{ bbCard.description }}</p>
      <button class="toggle-text-btn" (click)="toggleDescription(bbCard)">
        {{ bbCard._showDescription ? 'Hide' : 'Show' }} Description
      </button>
      <div class="card-dark card-meta-container">
        <div class="card-meta-dark">ID: {{ bbCard.id }}</div>
        <div class="card-meta-dark">Created: <br>{{ bbCard.created }}</div>
        <div class="card-meta-dark">Updated: <br>{{ bbCard.updated }}</div>
        <div class="card-meta hidden">user id: {{ bbCard.userId }}</div>
        <div class="card-meta hidden">listId: {{ bbCard.listId }}</div>      
        <div class="card-meta hidden">COLOR: {{ bbCard.color }}</div>
        <div class="card-meta hidden">POSITION: {{ bbCard.position }}</div>
      </div>
     </section>
 
  `,
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {  @Input() bbCard!: BBCard;
  /**You have to add the ! because the input is expecting the value to be passed. 
   * In this case, there is no default value. In our example application case we know that the value will be passed in - this is by design. 
   * The exclamation point is called the non-null assertion operator and it tells the TypeScript compiler that the value of this property won't be null or undefined. */
  
  //Define card form forsending data to server
  editCardForm = new FormGroup({
    title: new FormControl(""),
    description: new FormControl(""),
     //position: new FormControl(""),
   });

  constructor(private fb: FormBuilder) {}

  cardsService: CardsService = inject(CardsService);
  
  ngOnInit() {
    // Initialize the form with all required controls
    this.editCardForm = new FormGroup({
      title: new FormControl(this.bbCard?.title || null),
      description: new FormControl(this.bbCard?.description || null),
      //position: new FormControl(this.bbCard?.position || null)
     });
  }

  toggleDescription(card: any): void {
    card._showDescription = !card._showDescription;
  }
  
  async submitCard() {
    try {
      const editedCard =  Object.assign({}, this.bbCard);
      editedCard.description = this.editCardForm.value.description ?? "";
      editedCard.title = this.editCardForm.value.title ?? "";
      const updatedCard = await this.cardsService.updateCard(editedCard); // Fetch updated card
      this.bbCard = Object.assign({}, updatedCard); // Safely assign to bbCard
    } catch (error) {
      console.error('Failed to update card:', error);
    }
  }
  
}
