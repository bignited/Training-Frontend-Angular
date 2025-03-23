import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-create-course',
  imports: [ReactiveFormsModule],
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
        </select><br>
        <label for="teacher">Course given by</label><br>
        <input type="text" name="teacher" formControlName="teacher"><br>
        <label for="date">Date:</label>
        <input type="date" name="date" formControlName="date"><br>
        <label for="time">Time start:</label>
        <input type="time" name="time" formControlName="time"><br>
        <input type="submit" value="Add Course">
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
export class CreateCourseComponent {
createCourseForm: FormGroup;

constructor(private courseService: CourseService){
  this.createCourseForm = new FormGroup({
    name: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    teacher: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required)
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
      console.log('Succesfully added course')
    })
   
}
}


