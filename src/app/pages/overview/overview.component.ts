import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { CourseListComponent } from '../../components/course-list/course.list.component';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AlertBoxComponent } from '../../components/alert-box/alert-box.component';
import { SessionstorageService } from '../../services/sessionstorage.service';

@Component({
  selector: 'app-overview',
  imports: [CommonModule, CourseListComponent, NavbarComponent, AlertBoxComponent],
  templateUrl: 'overview.component.html',
  styleUrl: 'overview.component.scss'
})
export class OverviewComponent implements OnInit {

  courseList: any = [];
  enrolledCourses: any = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;
  noCourses: boolean = false;

  courseService = inject(CourseService);
  sessionStorageService = inject(SessionstorageService);

  ngOnInit() {
    this.fetchCourses();
  }

  fetchCourses() {
    this.courseService.getAllCourses().subscribe({
      next: (courses: Course[]) => {
        this.courseList = courses;
        if (courses.length < 1) {
          this.noCourses = true;
        }
        if (courses && courses.length > 0) {
          sessionStorage.setItem('courseArray', JSON.stringify(courses));
        }
      }
    });
  }

  handleError(error: string) {
    this.errorMessage = error;
  }

  handleSuccess(successMessage: string) {
    this.successMessage = successMessage;
  }

  clearMessage() {
    this.errorMessage = null;
    this.successMessage = null;
  }
}