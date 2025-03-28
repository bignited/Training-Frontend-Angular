import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Course } from '../../models/course.model';
import { CommonModule } from '@angular/common';
import { ConflictCheckService } from '../../services/conflict-check.service';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule],
  template: `
    <section class="list-item">
      <div class="course-image">
        <figure><img [src]="course.imageUrl ?? 'https://placehold.co/300x200'" alt="placeholder image"></figure>
      </div>
      <div class="course-data">
        <h2>{{ course.name }}</h2>
          <div>
            <div class="course-detail">
              <img src="icons/location-pin.svg">
              <p>{{ course.location }}</p>
            </div>
            <div class="course-detail">
              <img src="icons/person.svg">
              <p>{{course.teacher}}</p>
            </div>
          </div>
          <div>
            <div class="course-detail">
              <img src="icons/calendar.svg">
              <p>{{course.date}}</p>
            </div>
            <div class="course-detail">
              <img src="icons/clock.svg">
              <p>{{course.timeStart}} - {{course.timeEnd }}</p>
            </div>
          </div>
          <button (click)="toggleEnrollment()" 
          [ngClass]="isEnrolledView ? 'button-danger': 'button-primary'">
           {{ isEnrolledView ? 'Unenroll' : 'Enroll' }}</button>
      </div>
    </section>
  `,
  styles: `
  .list-item {
    background-color: #edf4ff;
    margin: auto;
    border-radius: 20px;
    width: 350px;
  }

  .course-data {
    padding: 25px 35px;
  }
 
  .course-detail {
    display: flex;
    gap: 5px;

    img {
      width: 20px
    }
  }

  .course-image{
     
    figure {
      margin: 0;
      padding: 0;
      aspect-ratio: 16 / 9;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      overflow: hidden;
    }

    img {
      object-fit: contain;
      width: 100%;
      transform-origin: center;
    }
  }`
})
export class CourseListComponent implements OnInit {

  @Input() course!: Course;
  // value is set on import, e.g. <app-course-list [isEnrolledView]="true">
  @Input() isEnrolledView: boolean = false;

  @Output() courseUnenrolled = new EventEmitter<void>();
  @Output() enrollmentError = new EventEmitter<string>();
  @Output() enrollmentSuccess = new EventEmitter<string>();

  enrolledCourses: any;
  isEnrolled: boolean = false; 

  private conflictCheck = inject(ConflictCheckService);

  constructor(){
    const storedCourses = sessionStorage.getItem('enrolledCourses');
    this.enrolledCourses = storedCourses ? JSON.parse(storedCourses) : [];
  }
 
  ngOnInit(){
    if(this.enrolledCourses.includes(this.course.id)){
      this.isEnrolled = true;
    }
  }

  toggleEnrollment() {
    if (this.isEnrolledView) {
       this.unenroll(this.course.id);
    } else {
      this.enroll(this.course.id);
    }
  }

  async enroll(courseId:number){

    const alreadyEnrolled = this.enrolledCourses.includes(this.course.id);
    if (!alreadyEnrolled) {
       
      //fetch which (if any) courses are saved in sessionStorage
    const storedCourses = sessionStorage.getItem('enrolledCourses');
    this.enrolledCourses = storedCourses ? JSON.parse(storedCourses) : [];
    
    let errorMessage = await this.conflictCheck.checkForDateConflict(this.course.id);
    if(errorMessage){
      this.enrollmentError.emit(errorMessage); 
      return console.log('Can\'t enroll due to conflict'); 
    } else {
      this.enrollmentSuccess.emit('Enrolled succesfully');
    }
     
    this.enrolledCourses.push(courseId); 
    console.log(this.enrolledCourses);
    //set to 'true' to display success message 
    this.isEnrolled = true; 
    //update the enrolledCourses array in sessionStorage
    sessionStorage.setItem('enrolledCourses', JSON.stringify(this.enrolledCourses));
    
    

    } else {
      console.log('Already enrolled in this course');
      return; 
    }
  }

  unenroll(courseId:number){

    const index = this.enrolledCourses.indexOf(courseId);
    this.enrolledCourses.splice(index, 1);
    sessionStorage.setItem('enrolledCourses', JSON.stringify(this.enrolledCourses));
    this.courseUnenrolled.emit();
  }
}
