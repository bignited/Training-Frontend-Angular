import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
 
  private url = "http://localhost:3000/courses";
  constructor(private http: HttpClient) { }
  
  create(course:Course){
    return this.http.post(`${this.url}`, course);
    }
  

  public getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.url}`);
  }
  
  getCourseById(id:number): Observable<Course>{
    return this.http.get<Course>(`${this.url}/` + id );
  }

  deleteCourseById(id:string){
    return this.http.delete(`${this.url}/` + id); 
  }

  editCourseById(id:string, course:Course){
    return this.http.put(`${this.url}` + id, course)
  }

}


