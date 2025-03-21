import { CommonModule, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CourseListComponent } from '../../components/course-list/course-list.component';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-overview',
  imports: [CommonModule, CourseListComponent],
  templateUrl: 'overview.component.html',
  styleUrl: 'overview.component.scss'
})
export class OverviewComponent {

  //Initalize empty array
  allCourses = [];

  courseList: Course[] = [
    {
    id: 0,
    name: 'JavaScript',
    location: 'Antwerpen',
    teacher: 'Miss Jones',
    image: 'null',
    date: new Date(1-1-2026)
  }, 
{ id: 1,
  name: 'Python',
  location: 'Brussels',
  teacher: 'Mr. Simons',
  image: 'null',
  date: new Date(2-5-2025)}
]
}
