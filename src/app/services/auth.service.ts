import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

   constructor(private router: Router) { }
 
  // Store token securely
  public setToken(token: string): void {
    sessionStorage.setItem('accesToken', token);
  }

  canActivate(): boolean {
    if(sessionStorage.getItem('accesToken') === 'loggedIn'){
      return true;
    } else {
      this.router.navigate(['']);
      return false; 
    }
  }
  // Retrieve token
  public getToken(): string | null {
    return sessionStorage.getItem('accesToken');
  }
  // Remove token
  public removeToken(): void {
    sessionStorage.removeItem('accesToken');
  }
}
