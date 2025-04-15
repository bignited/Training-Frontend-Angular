import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CourseListComponent } from "../../components/course-list/course.list.component";
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { ConflictCheckService } from '../../services/conflict-check.service';
import { AlertBoxComponent } from '../../components/alert-box/alert-box.component';

@Component({
  selector: 'app-enrolled',
  imports: [NavbarComponent, CourseListComponent, CommonModule, AlertBoxComponent],
  templateUrl: 'enrolled.component.html',
  styleUrl: 'enrolled.component.scss'
})
export class EnrolledComponent {
  errorMessage: string | null = null;
  successMessage: string | null = null;
  
  fetchedCourses: Course[] = [];
  enrolledCoursesIds = JSON.parse(sessionStorage.getItem("enrolledCourses") || "[]");
  noCourses: boolean = false;

  courseService = inject(CourseService);
  conflictCheckService = inject(ConflictCheckService);

  ngOnInit() {
    this.fetchCourses();
  }

  fetchCourses() {
    this.fetchedCourses = [];
    this.enrolledCoursesIds = JSON.parse(sessionStorage.getItem("enrolledCourses") || "[]");
  
    if (this.enrolledCoursesIds.length < 1) {
      this.noCourses = true;
    }
  
    this.enrolledCoursesIds.forEach((id: number) => {
      this.courseService.getCourseById(id).subscribe({
        next: (data) => {
          if (data) {
            this.fetchedCourses.push(data);
          }
        },
        error: (err) => console.error('Error fetching enrolled course:', err)
      });
    });
  }

  async onCourseUnenrolled(courseId: number) {
    const error = await this.conflictCheckService.unenrollCheck(courseId);
  if (error) {
    this.errorMessage = error;
    return; // don't proceed with unenrolling or fetching courses
  }
    this.fetchCourses();
  }

  clearMessage() {
    this.errorMessage = null;
    this.successMessage = null;
  }

  handleError(error: string) {
    this.errorMessage = error;
  }

  handleSuccess(successMessage: string) {
    this.successMessage = successMessage;
  }
}