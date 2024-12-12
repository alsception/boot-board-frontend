import {Component} from '@angular/core';
import {HomeComponent} from './home';
import {RouterModule} from '@angular/router';

@Component({
  selector: "app-root",
  imports: [/*HomeComponent, */RouterModule],
  template: `
    <main class="main">
      <a [routerLink]="['/']">
        <header class="header-line container-nb">          
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