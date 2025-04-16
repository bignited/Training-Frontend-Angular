import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';
import { ImageInputComponent } from '../image-input/image-input.component';
import { TextareaComponent } from "../textarea/textarea.component";
import { Course } from '../../models/course.model';
import { DraftService } from '../../services/draft.service';

@Component({
  selector: 'app-course-form',
  imports: [ReactiveFormsModule, CommonModule, InputComponent, SelectComponent, TextareaComponent, ImageInputComponent],
  templateUrl: 'course-form.component.html',
  styleUrl: 'course-form.component.scss'
})
export class CourseFormComponent implements OnInit {
  createCourseForm: FormGroup;
  validationError: string | undefined;
  successMessage: string | undefined;
  currentDateISO!: string;
  currentDate!: Date;

  tooLong: boolean = false;

  @Output() courseAdded = new EventEmitter<void>();
  @Output() previewCourse = new EventEmitter<Course>();

  courseService = inject(CourseService);
  draftService = inject(DraftService);

  locationArray = [
    '',
    'Antwerpen',
    'Leuven',
    'Brussels',
    'Gent'
  ]

  constructor() {
    this.createCourseForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      teacher: new FormControl('', [Validators.required]),
      image: new FormControl(''),
      date: new FormControl('', [Validators.required, this.validateCalendar]),
      timeStart: new FormControl('', Validators.required),
      timeEnd: new FormControl('', [Validators.required]),
    },
      this.validateTime);
  }

  ngOnInit(): void {
    this.setCurrentDate();
    this.checkForDraft();
  }

  validateCalendar(control: AbstractControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const inputYear = selectedDate.getFullYear();

    if(inputYear > 2038){
      return { 'tooFarInFuture': true}
    }
    if (selectedDate <= today) {
      return { 'dateInPast': true };
    }
    return null;
  }

  validateTime(control: AbstractControl): ValidationErrors | null {
    const form = control as FormGroup;
    const startTime = form.get('timeStart')?.value;
    const endTime = form.get('timeEnd')?.value;

    if (endTime < startTime) {
      return { endBeforeStart: true }
    }
    if (startTime > endTime) {
      return { startAfterEnd: true }
    }
    return null;
  }

  setCurrentDate() {
    const today = new Date();
    this.currentDate = today;
    this.currentDateISO = today.toISOString().split('T')[0];
  }

  submitForm() {
    if (this.createCourseForm.valid) {
      this.previewCourse.emit(this.createCourseForm.value);
    } else {
      this.createCourseForm.markAllAsTouched();
    }
  }

  checkForDraft() {
    const draft = this.draftService.getDraft();
    if (draft) {
      console.log(draft);
      this.createCourseForm.setValue(draft);
    }
  }
}