import { Component, inject, input, Input, OnInit, output, Output } from '@angular/core';
import { Course } from '../../models/course.model';
import { CommonModule } from '@angular/common';
import { ConflictCheckService } from '../../services/conflict-check.service';
import { CourseDetailComponent } from '../course-detail/course-detail.component';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseDetailComponent],
  templateUrl: './course.list.component.html',
  styleUrl: './course.list.component.scss'
})
export class CourseListComponent implements OnInit {

  @Input() course!: Course;
  isEnrolledView = input<boolean>(false);
  buttonId: string | undefined;

  courseUnenrolled = output<void>();
  enrollmentError = output<string>();
  enrollmentSuccess = output<string>();

  enrolledCourses: any[];
  isEnrolled: boolean = false;

  conflictCheck = inject(ConflictCheckService);

  constructor() {
    const storedCourses = sessionStorage.getItem('enrolledCourses');
    this.enrolledCourses = storedCourses ? JSON.parse(storedCourses) : [];
  }

  ngOnInit() {
    if (this.enrolledCourses.includes(this.course.id)) {
      this.isEnrolled = true;
    }

    if(!this.buttonId){
      this.buttonId = this.course.name.toLowerCase() + '-course-button';
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

    const alreadyEnrolled = this.enrolledCourses.includes(this.course.id);
    if (!alreadyEnrolled) {

      const storedCourses = sessionStorage.getItem('enrolledCourses');
      this.enrolledCourses = storedCourses ? JSON.parse(storedCourses) : [];

      const errorMessage = await this.conflictCheck.checkForDateConflict(this.course.id);
      if (errorMessage) {
        this.enrollmentError.emit(errorMessage);
        return;
      } else {
        const successMessage = "Enrolled successfully";
        this.enrollmentSuccess.emit(successMessage);
      }

      this.enrolledCourses.push(courseId);
      this.isEnrolled = true;
      sessionStorage.setItem('enrolledCourses', JSON.stringify(this.enrolledCourses));

    } else {
      return;
    }
  }

  unenroll(courseId: number) {

    const index = this.enrolledCourses.indexOf(courseId);
    this.enrolledCourses.splice(index, 1);
    sessionStorage.setItem('enrolledCourses', JSON.stringify(this.enrolledCourses));
    this.courseUnenrolled.emit();
  }
}