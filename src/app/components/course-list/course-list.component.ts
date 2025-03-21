import { Component, Input } from '@angular/core';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  imports: [],
  template: `
    <section class="listing">
      <h2>{{ course.name }}</h2>
      <p>Location: {{ course.location }}</p>
      <p>Given by: {{course.teacher}}</p>
      <p>Date: {{course.date}}</p>

    </section>
  `,
  styles: ``
})
export class CourseListComponent {

  @Input() course!: Course;
   
}
