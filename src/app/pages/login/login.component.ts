import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { createRegExp, exactly } from 'magic-regexp'
 
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | undefined; 
  
  router = inject(Router);

  constructor(){
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(){
    const usernameValue = this.loginForm.get('username')?.value;
    const passwordValue = this.loginForm.get('password')?.value;

    if(usernameValue === passwordValue){
      console.error('Incorrect Credentials'); 
      this.loginError = "Incorrect Credentials"; 
    } else if (this.toHex(usernameValue) !== this.toHex(passwordValue)) {
      console.error('Incorrect Credentials'); 
      this.loginError = "Incorrect Credentials";
    } else if (this.loginForm.valid){
      console.log(usernameValue, passwordValue); 
      this.router.navigateByUrl("overview"); 
    }
  }
  
  toHex(str:string){
    let match = str.match(/[0-9a-fA-F]+/g); // Extract valid hex parts
    if (!match) return null; // Return null if no valid hex found

    let hexString = match.join(''); // Join into one continuous hex string
    let decimalValue = parseInt(hexString, 16); // Convert hex to decimal

    return decimalValue;
  }
}
