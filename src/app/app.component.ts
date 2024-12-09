import {Component} from '@angular/core';
import { HomeComponent } from './home';//actually use different approach with index.ts
//import {HomeComponent} from './home/home.component';
import {RouterModule} from '@angular/router';

@Component({
  selector: "app-root",
  imports: [HomeComponent, RouterModule],
  template: `
    <main class="main">
      <a [routerLink]="['/']">
        <header class="header-line container-nb">
          <!--img class="brand-logo" src="/assets/logo-bb.png" alt="logo" aria-hidden="true" /-->
          <!-- <img
            class="brand-logo"
            width="225"
            height="50"
            src="/assets/logo/bb-logo-full.png"
            alt="logo"
            aria-hidden="true"
          /> -->
          <span class="boot">BOOT</span><span class="board">BOARD</span>
        </header>
      </a>
      <section class="content /*container-nb*/" >
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "boot-board";
}