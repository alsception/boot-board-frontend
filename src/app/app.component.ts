import {Component} from '@angular/core';
//import {HomeComponent} from '../app/components/home/home.component'
import {RouterModule} from '@angular/router';

@Component({
  selector: "app-root",
  imports: [/*HomeComponent, */RouterModule],
  template: `
  
    <div class="container great-vibes-regular">
    <!-- Sidebar Menu -->
    <nav class="sidebar">
    <div class="animated-border-box">
    <ul>
          <li><a [routerLink]="['/']">Dashboard</a></li>
          <li><a [routerLink]="['/boards']">Boards</a></li>
          <li><a [routerLink]="['/settings']">Settings</a></li>
          <li><a (click)="logout()">Logout</a></li>
        </ul>
    </div>
    <div class="animated-border-box-glov">
    </div>
        
      </nav>    

      <!-- Main Content -->
      <main class="main">
        <!-- Header -->
        <a [routerLink]="['/']">
          <header class="header-line container-nb">
          
          <!-- 🍄 -->

          <div>
          <span class="boot great-vibes-regular">BOOT</span><span class="board great-vibes-regular">BOARD🪼</span>
          </div>
            
           <div  class="hidden">
            <span class="boot great-vibes-regular btn-shine hhh">BOOTBOARD🪼</span>
            </div>


          </header>
        </a>

        <!-- Content Section -->
        <section style="margin-left: 220px;" class="content">
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