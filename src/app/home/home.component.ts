import { Component , inject} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListComponent } from "../components/list.component"
import { ListsService } from '../services/lists.service';
import { CardsService } from '../services/cards.service';
import { BoardsService } from '../services/boards.service';
import { BBBoard } from "../interfaces/bbboard";
import { BBCard } from "../interfaces/bbcard";
import { BBList } from "../interfaces/bblist";
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: "app-home",
  imports: [CommonModule, ListComponent, DragDropModule],
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
          (click)="filterResults(filter.value)"
        >
          Search
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
 -->      <bb-list cdkDrag class="draggable-item"
        *ngFor="let xList of filteredLists"
        [bbList]="xList"
      ></bb-list>
    </section>
  `,
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  //readonly baseUrl = "https://angular.dev/assets/images/tutorials/common";

  boards: BBBoard[] = [];
  cards: BBCard[] = [];
  lists: BBList[] = [];

  listsService: ListsService = inject(ListsService);
  boardsService: BoardsService = inject(BoardsService);
  cardsService: CardsService = inject(CardsService);

  filteredBoards: BBBoard[] = [];
  filteredCards: BBCard[] = [];
  filteredLists: BBList[] = [];

  constructor() {
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
  
}
