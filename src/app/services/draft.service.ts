import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class DraftService {

  draftCourse?: Course;

  constructor() { }

  setDraft(course: Course) {
    this.draftCourse = course;
  }

  getDraft(): Course | undefined {
    return this.draftCourse;
  }

  clearDraft() {
    this.draftCourse = undefined;
  }
}
