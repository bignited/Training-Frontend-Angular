import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { catchError, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-form',
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div>
      <form (ngSubmit)="addCourse()" [formGroup]="createCourseForm">
        <label for="name">Course name</label><br>
        <input type="text" name="name" formControlName="name"><br>
        <label for="location">Location</label><br>
        <select name="location" formControlName="location">
          <option value="Antwerpen">Antwerpen</option>
          <option value="Brussels">Brussels</option>
          <option value="Gent">Gent</option>
          <option value="Leuven">Leuven</option>
        </select><br>
        <label for="teacher">Course given by</label><br>
        <input type="text" name="teacher" formControlName="teacher"><br>
        <label for="date">Date:</label><br>
        <input type="date" name="date" formControlName="date"><br>
        <label for="time">Time start:</label><br>
        <input type="time" name="timeStart" formControlName="timeStart"><br>
        <input type="submit" value="Add Course" [disabled]="!createCourseForm.valid">
        <div class="error-text" *ngIf="validationError" id="error-message">
            <p>{{ validationError }}</p>
        </div>
        <div class="success-text" *ngIf="successMessage" id="error-message">
            <p>{{ successMessage }}</p>
        </div>
      </form>
    </div>
  `,
  styles: `
  $lightgray: #efeff0;
  div {
    background-color: $lightgray;
    padding: 25px;
  }
  `
})
export class CourseFormComponent {
createCourseForm: FormGroup;
validationError: string | undefined;
successMessage: string | undefined; 

@Output() courseAdded = new EventEmitter<void>();

constructor(private courseService: CourseService){
  this.createCourseForm = new FormGroup({
    name: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    teacher: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    timeStart: new FormControl('', Validators.required)
  })
}

addCourse() {
   console.log('Form Submitted:', this.createCourseForm.value);
   
   this.courseService.create(this.createCourseForm.value)
    .pipe(
      catchError(error => {
        console.error('Problem:', error);
        return throwError (() => new Error ('Something went wrong.') )
      })
    ).subscribe(data => {
      console.log('Succesfully added course');
      this.successMessage ='Course added succesfully';
      this.courseAdded.emit();
    })

    this.createCourseForm.reset();
}
}


