import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
 
  private url = "http://fake.api.url";
  constructor(private http: HttpClient) { }
  
  createnewCourse(course:Course){
    return this.http.post(`${this.url}/courses`, {course}).subscribe((res:any)=>{
      if(res.result){
        console.log("Course added succesfully")
      } else {
        console.log(res.message)
      }
    })
  }
 
}

