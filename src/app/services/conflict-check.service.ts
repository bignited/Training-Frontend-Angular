import { inject, Injectable } from '@angular/core';
import { CourseService } from './course.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ErrorMessages } from '../errors/errormessages';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class ConflictCheckService {

  courseService = inject(CourseService);
  newCourse: Course = {
    id: 1,
    name: 'error',
    description: 'error',
    location: 'error',
    teacher: 'error',
    type: 'error',
    image: 'error',
    date: new Date('01-01-2026'),
    timeStart: '09:00',
    timeEnd: '10:00',
    contactPhone: 'error',
    contactEmail: 'error'
  }

  parseTime(time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  async checkForDateConflict(newCourseId: number) {
    const enrolledCourses = JSON.parse(sessionStorage.getItem('enrolledCourses') || '[]');

    try {
      this.newCourse = await firstValueFrom(this.courseService.getCourseById(newCourseId)) || this.newCourse;

      const startTimeNewCourse = this.newCourse.timeStart;
      const endTimeNewCourse = this.newCourse.timeEnd
      const locationNewCourse = this.newCourse.location;
      const dateNewCourse = this.newCourse.date;

      const enrolledCourseData = await Promise.all(
        enrolledCourses.map((id: number) => lastValueFrom(this.courseService.getCourseById(id)))
      );

      for (const course of enrolledCourseData) {
        const startTimeEnrolledCourse = course.timeStart;
        const endTimeEnrolledCourse = course.timeEnd;
        const locationEnrolledCourse = course.location;
        const dateEnrolledCourse = course.date;

        if (dateNewCourse === dateEnrolledCourse &&
          this.parseTime(startTimeNewCourse) <= this.parseTime(endTimeEnrolledCourse) &&
          this.parseTime(startTimeEnrolledCourse) <= this.parseTime(endTimeNewCourse)) {
          return ErrorMessages.timeConflict;
        }

        if (dateNewCourse === dateEnrolledCourse &&
          locationEnrolledCourse != locationNewCourse &&
          endTimeNewCourse <= "12:00" && endTimeEnrolledCourse <= "12:00") {
          return ErrorMessages.twoLocationsConflictMorning;
        }

        if (dateNewCourse === dateEnrolledCourse &&
          locationEnrolledCourse != locationNewCourse &&
          endTimeNewCourse >= "12:00" && endTimeEnrolledCourse >= "12:00") {
          return ErrorMessages.twoLocationsConflictAfternoon;
        }
      }
      return false;

    } catch (error) {
      console.error('Error fetching courses:', error);
      return;
    }
  }

  async unenrollCheck(CourseId: number) { 
    const today = new Date();
    let tomorrow = new Date();
    let afterTomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1)
    afterTomorrow.setDate(tomorrow.getDate() + 1);

    try {
      this.newCourse = await firstValueFrom(this.courseService.getCourseById(CourseId)) || this.newCourse;
      const courseDate = new Date(this.newCourse.date).toDateString();

      if(courseDate === tomorrow.toDateString()){
        return ErrorMessages.unenrollTomorrow;
      } else if (courseDate === afterTomorrow.toDateString()){
        return ErrorMessages.unenrollAfterTomorrow; 
      }
      return false;
      
    } catch (error){
      return
    }
  }

}