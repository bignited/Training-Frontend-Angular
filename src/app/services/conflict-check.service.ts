import { inject, Injectable } from '@angular/core';
import { CourseService } from './course.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ErrorMessages } from '../errors/errormessages';

@Injectable({
  providedIn: 'root'
})
export class ConflictCheckService {

  courseService = inject(CourseService);

  async checkForDateConflict(newCourseId:number){
    const storedCourses = (sessionStorage.getItem('enrolledCourses'));
    const enrolledCourses = storedCourses ? JSON.parse(storedCourses) : [];

    try {
      const newCourse = await firstValueFrom(this.courseService.getCourseById(newCourseId));
      const startTimeNewCourse = newCourse.timeStart;
      const endTimeNewCourse = newCourse.timeEnd
      const locationNewCourse = newCourse.location;
      const dateNewCourse = newCourse.date;

      const enrolledCourseData = await Promise.all(
        enrolledCourses.map((id: number) => lastValueFrom(this.courseService.getCourseById(id)))
      );

      for (const course of enrolledCourseData) {
        const startTimeEnrolledCourse = course.timeStart;
        const endTimeEnrolledCourse = course.timeEnd; 
        const locationEnrolledCourse = course.location;
        const dateEnrolledCourse = course.date;

      if (dateNewCourse === dateEnrolledCourse && endTimeNewCourse>= startTimeEnrolledCourse) {
        return ErrorMessages.timeConflict;  
      }
      
      if(dateNewCourse === dateEnrolledCourse && locationEnrolledCourse != locationNewCourse){
        return ErrorMessages.twoLocationsConflict;
      }
    }
      return false;
      
    } catch (error){
      console.error('Error fetching courses:', error);
      return;
    }
}}