import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course.model';
import { Observable } from 'rxjs';

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
  
  getCourseById(id:string){
    return this.http.get<Course>(`${this.url}/` + id );
  }

}


