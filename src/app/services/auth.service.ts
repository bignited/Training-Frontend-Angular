import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  router = inject(Router);
  
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
  
  public getToken(): string | null {
    return sessionStorage.getItem('accesToken');
  }

  public removeToken(): void {
    sessionStorage.removeItem('accesToken');
  }
}
