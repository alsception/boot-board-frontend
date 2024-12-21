import {Component} from '@angular/core';
//import {HomeComponent} from '../app/components/home/home.component'
import {RouterModule} from '@angular/router';

@Component({
  selector: "app-root",
  imports: [/*HomeComponent, */RouterModule],
  template: `
    <div class="container">
      <!-- Sidebar Menu -->
      <nav class="sidebar">
        <ul>
          <li><a [routerLink]="['/']">Dashboard</a></li>
          <li><a [routerLink]="['/boards']">Boards</a></li>
          <li><a [routerLink]="['/settings']">Settings</a></li>
          <li><a (click)="logout()">Logout</a></li>
        </ul>
      </nav>

      <!-- Main Content -->
      <main class="main">
        <!-- Header -->
        <a [routerLink]="['/']">
          <header class="header-line container-nb">
            <span class="boot">BOOT</span><span class="board">BOARD</span>
          </header>
        </a>

        <!-- Content Section -->
        <section class="content">
          <router-outlet></router-outlet>
        </section>
      </main>
    </div>

  `,
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "boot-board";

  logout(): void {
    console.log('Logging out...');
    // Implement logout logic here, e.g., clearing authentication tokens
  }
  
}