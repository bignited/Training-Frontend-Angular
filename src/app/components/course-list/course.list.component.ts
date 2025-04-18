import { Component, inject, input, Input, OnInit, output, Output } from '@angular/core';
import { Course } from '../../models/course.model';
import { CommonModule } from '@angular/common';
import { ConflictCheckService } from '../../services/conflict-check.service';
import { CourseDetailComponent } from '../course-detail/course-detail.component';
import { SessionstorageService } from '../../services/sessionstorage.service';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseDetailComponent],
  templateUrl: './course.list.component.html',
  styleUrl: './course.list.component.scss'
})
export class CourseListComponent implements OnInit {

  @Input() course!: Course;
  isEnrolledView = input<boolean>(false);
  cardId = input<string>();
  buttonId = input<string>();
 
  courseUnenrolled = output<number>();
  enrollmentError = output<string>();
  enrollmentSuccess = output<string>();

  enrolledCourseIds: number[];
  isEnrolled: boolean = false;
  placeholderImageURL: string = 'https://placehold.co/300x200';

  conflictCheck = inject(ConflictCheckService);
  sessionStorageService = inject(SessionstorageService);

  constructor() {
    const storedCourses = sessionStorage.getItem('enrolledCourses');
    this.enrolledCourseIds = storedCourses ? JSON.parse(storedCourses) : [];
  }

  ngOnInit() {
    if (this.enrolledCourseIds.includes(this.course.id)) {
      this.isEnrolled = true;
    }
  }

  toggleEnrollment() {
    if (this.isEnrolledView()) {
      this.unenroll(this.course.id);
    } else {
      this.enroll(this.course.id);
    }
  }

  async enroll(courseId: number) {

    const alreadyEnrolled = this.enrolledCourseIds.includes(this.course.id);
    if (!alreadyEnrolled) {

      const storedCourses = sessionStorage.getItem('enrolledCourses');
      this.enrolledCourseIds = storedCourses ? JSON.parse(storedCourses) : [];

      const errorMessage = await this.conflictCheck.checkForDateConflict(this.course.id);
      if (errorMessage) {
        this.enrollmentError.emit(errorMessage);
        return;
      } else {
        const successMessage = "Enrolled successfully";
        this.enrollmentSuccess.emit(successMessage);
      }

      this.enrolledCourseIds.push(courseId);
      this.isEnrolled = true;
      sessionStorage.setItem('enrolledCourses', JSON.stringify(this.enrolledCourseIds));

    } else {
      return;
    }
  }

  async unenroll(courseId: number) {

    const errorMessage = await this.conflictCheck.unenrollCheck(this.course.id);
    if (errorMessage) {
      this.enrollmentError.emit(errorMessage);
      return;
    } else {
      const index = this.enrolledCourseIds.indexOf(courseId);
      this.enrolledCourseIds.splice(index, 1);
      sessionStorage.setItem('enrolledCourses', JSON.stringify(this.enrolledCourseIds));
      this.courseUnenrolled.emit(this.course.id);

      const successMessage = "Unenrolled successfully";
      this.enrollmentSuccess.emit(successMessage);
    }
  }

  get isUserEnrolled(): boolean {
    const enrolledIds = JSON.parse(sessionStorage.getItem('enrolledCourses') || '[]');
    return enrolledIds.includes(this.course.id);
  }
}