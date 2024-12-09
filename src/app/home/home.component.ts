import { Component , inject} from "@angular/core";
import { CommonModule } from "@angular/common";

//import { HousingLocationComponent } from "../housing-location/housing-location.component";
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
      console.log("loding finished");
      console.log("this.lists",this.lists);
      console.log("this.filteredLists",this.filteredLists);

  }

  filterResults(text: string) {
    console.log("filtering results > ", text);
    //Se no xe cerca -> mostri tutto
    if (!text) {
      console.log("74")
      this.filteredLists = this.lists;
      console.log("76")
      return;
    }
    console.log("79")
    this.filteredLists = this.lists.filter(
      (list) =>
        list?.title.toLowerCase().includes(text.toLowerCase())
    );
    console.log("84")
    /**
     * This function uses the String filter function to compare the value of the text parameter against the housingLocation.city property.
     * You can update this function to match against any property or multiple properties for a fun exercise.
     */
  }  
  
}
