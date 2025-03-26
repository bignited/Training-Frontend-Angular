import { Component } from '@angular/core';
import { CourseFormComponent } from '../../components/course-form/course-form.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-create-course',
  imports: [NavbarComponent, CourseFormComponent],
  template: `
    <main>
      <app-navbar />
      <app-course-form />
    </main>

  `,
  styles: `
  main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}`
})
export class CreateCourseComponent {

}
