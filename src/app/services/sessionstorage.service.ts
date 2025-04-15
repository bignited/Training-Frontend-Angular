import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionstorageService {

  constructor() { }

  toSessionStorage(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  getFromSessionStorage(key: string){
    const savedData = JSON.parse(sessionStorage.getItem(key) || '[]');
    return savedData;
  }

}
