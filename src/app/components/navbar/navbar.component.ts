import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  template: `
    <nav id="navBar">
        <button class="button-primary" [routerLink]="'/overview'">Enroll</button>
        <button class="button-primary" [routerLink]="'/enrolled'">Enrolled</button>
        <button class="button-primary" id="createCourseButton" [routerLink]="'/create-course'">Create</button>
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