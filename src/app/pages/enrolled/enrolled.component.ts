import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CourseListComponent } from "../../components/course-list/course-list.component";
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-enrolled',
  imports: [NavbarComponent, CourseListComponent, CommonModule],
  templateUrl: 'enrolled.component.html',
  styles: `
  .list-items {
    margin: 0% 5%;
    display: flex;
    flex-wrap: wrap;
    width: auto;
    gap: 20px;
}`
})
export class EnrolledComponent {

  fetchedCourses: Course[] = [];
  enrolledCoursesIds = JSON.parse(sessionStorage.getItem("enrolledCourses") || "[]");
  
  constructor(private courseService: CourseService){

  }

  ngOnInit(){
    this.fetchCourses();
    
    console.log(`The courseId retreived was: ${this.enrolledCoursesIds}`);
  }
  
  fetchCourses() {
    this.enrolledCoursesIds.forEach((id: number) => {   
      this.courseService.getCourseById(id).subscribe({
        next: (data) => {
          console.log(data);
          this.fetchedCourses.push(data);
        },
        error: (err) => console.error('Error fetching enrolled courses:', err)
      });
    })
 }
}

