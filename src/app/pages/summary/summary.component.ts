import { Component, inject, Input, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Course } from '../../models/course.model';
import { DraftService } from '../../services/draft.service';
import { CourseService } from '../../services/course.service';
import { Router, RouterLink } from '@angular/router';
import { CourseListComponent } from '../../components/course-list/course.list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  imports: [NavbarComponent, CourseListComponent, CommonModule, RouterLink],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {

  @Input() course?: Course;

  draftService = inject(DraftService);
  courseService = inject(CourseService);
  router = inject(Router);

  ngOnInit() {
    this.course = this.draftService.getDraft();
  }

  onApprove() {
    if (this.course) {
      this.courseService.create(this.course);
      this.draftService.clearDraft();
      this.router.navigate(['/overview']);
      };
    }
  

  onEdit() {
    this.router.navigate(['/create-course']);
  }

  onCancel() {
    this.draftService.clearDraft();
    this.router.navigate(['/create-course']);
  }
}

