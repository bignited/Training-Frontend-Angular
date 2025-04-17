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

  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const usernameValue = this.loginForm.get('username')?.value;
    const passwordValue = this.loginForm.get('password')?.value;

    if (usernameValue === passwordValue) {
      console.error('Incorrect Credentials');
      this.loginError = "Incorrect Credentials";
    } else if (this.validateLogin(usernameValue) !== this.validateLogin(passwordValue)) {
      console.error('Incorrect Credentials');
      this.loginError = "Incorrect Credentials";
    } else if (this.loginForm.valid) {
      this.AuthService.setToken('loggedIn');
      this.router.navigateByUrl("overview");
    }
  }

  validateLogin(str: string) {
    const match = str.match(/[0-9a-fA-F]/g);
    if (!match) return null;

    const hexArray = match.map((value) => parseInt(value, 16));
    const reducedValue = hexArray.reduce((counter, value) => counter + value, 0);

    return reducedValue;
  }
}