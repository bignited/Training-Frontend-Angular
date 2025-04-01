import { Component, input } from '@angular/core';

@Component({
  selector: 'app-course-detail',
  imports: [],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {

  detail = input<any>(); 
  iconName = input<string>();
  iconClass = input<string>();
}
