import { Component, Input } from '@angular/core';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  imports: [],
  template: `
    <section class="list-item">
      <div class="course-image">
        <figure><img src="https://placehold.co/400x200" alt="placeholder image"></figure>
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
              <p>{{course.timeStart}}</p>
            </div>
          </div>
          <button (click)="checkIfEnrolled()" class="button-primary">Enroll</button>
      </div>
    </section>
  `,
  styles: `
  .list-item {
    background-color: #edf4ff;
    margin: auto;
    border-radius: 20px;
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
      max-width: 100%;
      transform-origin: center;
    }
  }`
})
export class CourseListComponent {

  @Input() course!: Course;
  enrolledCourses: any;

  constructor(){
    const storedCourses = sessionStorage.getItem('enrolledCourses');
    this.enrolledCourses = storedCourses ? JSON.parse(storedCourses) : [];
  }
 
  checkIfEnrolled(){

    const alreadyEnrolled = this.enrolledCourses.includes(this.course.id);
    if (!alreadyEnrolled) {
      this.enrollCourse(this.course.id);
    } else {
      console.log('Already enrolled in this course');
      return; 
    }
  }

  enrollCourse(courseId:any){

    this.enrolledCourses.push(courseId); 
    console.log(this.enrolledCourses);
    sessionStorage.setItem('enrolledCourses', JSON.stringify(this.enrolledCourses));

  }
}
