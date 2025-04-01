import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { InputComponent } from '../../components/input/input.component';
 
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, InputComponent],
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | undefined; 
  
  router = inject(Router);
  AuthService = inject(AuthService);

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
      this.AuthService.setToken('loggedIn'); 
      this.router.navigateByUrl("overview"); 
    }
  }
  
  toHex(str:string){
    let match = str.match(/[0-9a-fA-F]+/g);  
    if (!match) return null;  

    let hexString = match.join('');  
    let decimalValue = parseInt(hexString, 16);  

    return decimalValue;
  }
}
