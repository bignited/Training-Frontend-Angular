import { Component, inject, OnInit } from '@angular/core';
import { CourseFormComponent } from '../../components/course-form/course-form.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Course } from '../../models/course.model';
import { DraftService } from '../../services/draft.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course',
  imports: [NavbarComponent, CourseFormComponent],
  template: `
    <main>
      <app-navbar />
      <app-course-form (previewCourse)="sendForm($event)" />
    </main>
  `,
  styles: `
  main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}`
})
export class CreateCourseComponent {

  draftService = inject(DraftService);
  router = inject(Router);

  formData!: Course;
  newCourseData: any[] = [];

  sendForm(course: Course) {
    this.draftService.setDraft(course);
    this.router.navigate(['/summary']);
  }
}