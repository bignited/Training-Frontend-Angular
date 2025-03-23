import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CourseListComponent } from '../../components/course-list/course-list.component';
import { Course } from '../../models/course.model';
import { CreateCourseComponent } from "../../components/create-course/create-course.component";
import { CourseService } from '../../services/course.service';
 

@Component({
  selector: 'app-overview',
  imports: [CommonModule, CourseListComponent, CreateCourseComponent],
  templateUrl: 'overview.component.html',
  styleUrl: 'overview.component.scss'
})
export class OverviewComponent implements OnInit {

  courseList: Course[] = [];

  constructor(private courseService: CourseService){

  }

  ngOnInit(){
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.courseList = courses;
      },
      error: (err) => console.error('Error fetching courses:', err)
    }); 
  }
  
}
