import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { catchError, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'app-course-form',
  imports: [ReactiveFormsModule, CommonModule, InputComponent, SelectComponent],
  templateUrl: 'course-form.component.html',
  styleUrl: 'course-form.component.scss'
})
export class CourseFormComponent {
  createCourseForm: FormGroup;
  validationError: string | undefined;
  successMessage: string | undefined;

  @Output() courseAdded = new EventEmitter<void>();
  courseService = inject(CourseService);

  locationArray = [
    '',
    'Antwerpen',
    'Leuven',
    'Brussels',
    'Gent'
  ]
  
  constructor() {
    this.createCourseForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      teacher: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      timeStart: new FormControl('', Validators.required),
      timeEnd: new FormControl('', Validators.required),
    })
  }

  addCourse() {
    this.courseService.create(this.createCourseForm.value)
      .pipe(
        catchError(error => {
          console.error('Problem:', error);
          return throwError(() => new Error('Something went wrong.'))
        })
      ).subscribe(data => {
        this.successMessage = 'Course added succesfully';
        this.courseAdded.emit();
      })

    this.createCourseForm.reset();
  }
}