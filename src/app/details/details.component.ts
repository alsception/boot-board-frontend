import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { CardsService } from "../services/cards.service";
import { HousingLocation } from "../housinglocation";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-details",
  imports: [CommonModule, ReactiveFormsModule],
  /**
   * Notice that the housingLocation properties are being accessed with the optional chaining operator ?.
   * This ensures that if the housingLocation value is null or undefined the application doesn't crash.
   */
  template: `
    <article>
     <!--  <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
        crossorigin
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>
            Does this location have laundry: {{ housingLocation?.laundry }}
          </li>
        </ul>
      </section> -->
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <!--The template now includes an event handler (submit)="submitApplication()". 
        Angular uses parentheses syntax around the event name to define events in the template code. 
        The code on the right hand side of the equals sign is the code that should be executed when this event is triggered. 
        You can bind to browser events and custom events.
         -->
        <!-- <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" />
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
          <button type="submit" class="primary">Apply now</button>
        </form> -->
      </section>
    </article>
  `,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  /**This code gives the DetailsComponent access to the ActivatedRoute router feature that enables you to have access to the data about the current route.
   * In the constructor, the code converts the id parameter acquired from the route from a string to a number. */
/*
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params["id"], 10);
    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((housingLocation) => {
        this.housingLocation = housingLocation;
      });
  }
  
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? ""
    );
    //In the above code, the FormControls may return null. This code uses the nullish coalescing operator to default to empty string if the value is null.
  }*/
}
