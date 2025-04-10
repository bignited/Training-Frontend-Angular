import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  template: `
    <nav id="navBar">
        <button class="button-primary" id="enroll-button" [routerLink]="'/overview'">Enroll</button>
        <button class="button-primary" id="erolled-button" [routerLink]="'/enrolled'">Enrolled</button>
        <button class="button-primary" id="create-course-button" [routerLink]="'/create-course'">Create</button>
    </nav>
  `,
  styles: `
  nav {
    display: flex;
    justify-content: center;  
    gap: 5px;
    width: 100vw;
    
    margin-top: 75px;
    margin-bottom: 25px;
  }
  `
})
export class NavbarComponent {

}