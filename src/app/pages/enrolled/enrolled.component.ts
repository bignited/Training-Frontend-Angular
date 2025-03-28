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
}

  .no-courses-message {
    text-align: center;
    padding: 10% 0; 
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }`
})
export class EnrolledComponent {

  fetchedCourses: Course[] = [];
  enrolledCoursesIds = JSON.parse(sessionStorage.getItem("enrolledCourses") || "[]");
  noCourses: boolean = false;
  
  constructor(private courseService: CourseService){
  
  }

  ngOnInit(){
    this.fetchCourses();
    
    console.log(`The courseId retreived was: ${this.enrolledCoursesIds}`);
  }
  
  fetchCourses() {
    this.fetchedCourses = [];
    this.enrolledCoursesIds = JSON.parse(sessionStorage.getItem("enrolledCourses") || "[]");

    //If not enrolled in any courses, display message
    if(this.enrolledCoursesIds.length < 1){
      this.noCourses = true;
    }

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

 onCourseUnenrolled(){
  //refresh shown courses after deleting one
   this.fetchCourses(); 
 }
}

