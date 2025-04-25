import { Component, ChangeDetectorRef} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  imports: [MatAutocompleteModule,
            MatCardModule, 
            MatProgressSpinnerModule, 
            // RouterOutlet, 
            RouterModule,
            MatToolbarModule, 
            MatButtonModule, 
            MatIconModule, 
            MatMenuModule,
            CommonModule
          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Project';
  routeParam: any;
  // router: any;
  username: string | null = null;

  constructor(private userService: UserService, private router: Router, private cdr: ChangeDetectorRef) {}

  logoutFunction(): void {
    this.userService.logout(); // Log out user
    this.username = null; // Update username variable manually
    localStorage.removeItem('username'); // Clear username from local storage
    this.router.navigate(['/home']); // Redirect to home page after logout

    // Trigger change detection to update the UI
    this.cdr.detectChanges();
  }
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }
  
  navigateToLogin(){
    this.router.navigate(['/login']);
  }
}

// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { SignupComponent } from './signup/signup.component';
// import { LoginComponent } from './login/login.component';


// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterModule],
//   template: `
//     <nav>
//       <ul>
//         <li><a routerLink="/signup">Signup</a></li>
//         <li><a routerLink="/login">Login</a></li>
//         <li><a routerLink="/home">Home</a></li>
//       </ul>
//     </nav>
//     <router-outlet></router-outlet>
//   `,
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'signup-app';
// }
