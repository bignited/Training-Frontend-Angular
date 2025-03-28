import { Injectable } from '@angular/core';
import { CourseService } from './course.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConflictCheckService {

  constructor(private courseService: CourseService) { }

  async checkForDateConflict(newCourseId:number){
    const storedCourses = (sessionStorage.getItem('enrolledCourses'));
    const enrolledCourses = storedCourses ? JSON.parse(storedCourses) : [];

    try {
      const newCourse = await firstValueFrom(this.courseService.getCourseById(newCourseId));
      const startTimeNewCourse = newCourse.timeStart;
      const endTimeNewCourse = newCourse.timeEnd
      const locationNewCourse = newCourse.location;
      const dateNewCourse = newCourse.date;

      console.log(`You want to enroll into ${newCourse.name}, in ${locationNewCourse} starting ${startTimeNewCourse}`)
     
      const enrolledCourseData = await Promise.all(
        enrolledCourses.map((id: number) => lastValueFrom(this.courseService.getCourseById(id)))
      );

      console.log(`Value of enrolledCourseData: ${enrolledCourseData}`);

      for (const course of enrolledCourseData) {
        const startTimeEnrolledCourse = course.timeStart;
        const endTimeEnrolledCourse = course.timeEnd; 
        const locationEnrolledCourse = course.location;
        const dateEnrolledCourse = course.date;

      console.log(`You are already enrolled in ${course.name}, location ${locationEnrolledCourse} starting ${startTimeEnrolledCourse}`);

      if(startTimeNewCourse > startTimeEnrolledCourse)
      //same date, time overlap
      if (dateNewCourse === dateEnrolledCourse && endTimeNewCourse>= startTimeEnrolledCourse) {
        return 'You are already enrolled at a course at these hours';  
      }
      //same day, two locations in morning 
      //WIP
      if(dateNewCourse === dateEnrolledCourse && locationEnrolledCourse != locationNewCourse){
        return 'Can\'t attend two courses in the morning at different locations'
      }
    }
        
      return false;
      
    } catch (error){
      console.error('Error fetching courses:', error);
      return false;
    }
}}
