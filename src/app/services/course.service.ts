import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course.model';
import { Observable } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class CourseService {
 
  http = inject(HttpClient);
  baseUrl = import.meta.env.NG_APP_API_URL + '/courses'; 
  
  create(course:Course){
    return this.http.post(`${this.baseUrl}`, course);
    }
  
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}`);
  }
  
  getCourseById(id:number): Observable<Course>{
    return this.http.get<Course>(`${this.baseUrl}` + id );
  }

  deleteCourseById(id:string){
    return this.http.delete(`${this.baseUrl}` + id); 
  }

  editCourseById(id:string, course:Course){
    return this.http.put(`${this.baseUrl}` + id, course)
  }
}