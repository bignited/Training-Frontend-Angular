import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course.model';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  http = inject(HttpClient);
  baseUrl = environment.apiUrl + '/courses';

  storageKey = "courseArray";
  courses: Course[] = [];
  
  create(course: Course): void {

    this.http.post(`${this.baseUrl}`, course).subscribe({});

    this.courses = JSON.parse(sessionStorage.getItem(this.storageKey) || '[]');
    let courseIdCounter = parseInt(sessionStorage.getItem('courseIdCounter') || '1');
    course.id = courseIdCounter++;
    sessionStorage.setItem('courseIdCounter', courseIdCounter.toString());

    this.courses.push(course);
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.courses));
    return
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}`).pipe(
      map(courses => {
        if (courses && courses.length > 0) {
          return courses;
        } else {
          const cached = JSON.parse(sessionStorage.getItem(this.storageKey) || '[]');
          return cached;
        }
      }),
      catchError(() => {
        const cached = JSON.parse(sessionStorage.getItem(this.storageKey) || '[]');
        return of(cached);
      })
    );
  }

  getCourseById(id: number): Observable<Course | undefined> {
    return this.http.get<Course>(`${this.baseUrl}/` + id).pipe(
      map(course => {
        if (course) {
          return course;
        } else {
          const courses: Course[] = JSON.parse(sessionStorage.getItem('courseArray') || '[]');
          const course = courses.find(course => course.id === id);
          return course;
        }
      }),
      catchError(() => {
        const courses: Course[] = JSON.parse(sessionStorage.getItem('courseArray') || '[]');
        const course = courses.find(course => course.id === id);
        return of(course);
      })
    );
  }

  deleteCourseById(id: number) {
    this.http.delete(`${this.baseUrl}/` + id).subscribe({});

    const courses: Course[] = JSON.parse(sessionStorage.getItem('courseArray') || '[]');
    const index = courses.findIndex(course => course.id === id);
    courses.splice(index, 1);
    sessionStorage.setItem('courseArray', JSON.stringify(courses));
    return 'Course deleted succesfully'
  }
}