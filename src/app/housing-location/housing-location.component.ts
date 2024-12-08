import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocation} from '../housinglocation';
import {RouterModule} from '@angular/router';
import { BBList } from '../interfaces/bblist';

@Component({
  selector: 'bbf-list',
  imports: [CommonModule, RouterModule],
  template: `
    <section class="listing">
      <!--img
        class="listing-photo"
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
        crossorigin
      /-->
      <!-- <h2 class="listing-heading">{{ housingLocation.title }}</h2>
      <p class="listing-location">{{ housingLocation.text }}</p>
      <p class="listing-location">{{ housingLocation.color }}</p>
      <a [routerLink]="['/details', housingLocation.id]">Learn More</a> -->
    </section>
  `,
  styleUrls: ['./housing-location.component.css'],
})
export class HousingLocationComponent {
  @Input() bblist!: BBList;
  /**You have to add the ! because the input is expecting the value to be passed. 
   * In this case, there is no default value. In our example application case we know that the value will be passed in - this is by design. 
   * The exclamation point is called the non-null assertion operator and it tells the TypeScript compiler that the value of this property won't be null or undefined. */
}
