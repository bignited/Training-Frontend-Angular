import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
 
  http = inject(HttpClient);
  baseUrl = environment.apiUrl + '/courses'; 

  storageKey = "courseArray"; 
  courses: Course[] = []; 
  
  create(course:Course): void{
   
    this.http.post(`${this.baseUrl}`, course).subscribe({});
  
    this.courses = JSON.parse(sessionStorage.getItem(this.storageKey) || '[]' );
    course.id = Math.floor(Math.random() * 100); 
    this.courses.push(course);
    return sessionStorage.setItem(this.storageKey, JSON.stringify(this.courses));
    }
  
  getAllCourses(): Observable<Course[]> {
    JSON.parse(sessionStorage.getItem(this.storageKey) || '[]' );
    return this.http.get<Course[]>(`${this.baseUrl}`);
  }
  
  getCourseById(id:number): Observable<Course>{
     this.getFromStorageCourseById(id);
     return this.http.get<Course>(`${this.baseUrl}/` + id );
  }

  getFromStorageCourseById(id: number){
    const courses:Course[] = JSON.parse(sessionStorage.getItem(this.storageKey) || '[]');
    const course = courses.find(course => course.id === id);
    return of(course);
  }

  deleteCourseById(id:string){
    return this.http.delete(`${this.baseUrl}/` + id); 
  }

  editCourseById(id:string, course:Course){
    return this.http.put(`${this.baseUrl}/` + id, course)
  }
}