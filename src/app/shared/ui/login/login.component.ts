import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm = this.fb.group({
    username: ['ash', Validators.required],
    password: ['pikachu', Validators.required]
  });

  loginError = false;

  onLogin() {
    this.loginError = false;
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.getRawValue();
      const success = this.authService.login(username!, password!);
      if (success) {
        const redirectUrl = this.authService.redirectUrl;
        this.router.navigateByUrl(redirectUrl || '/home');
        this.authService.redirectUrl = null;
      } else {
        this.loginError = true;
      }
    }
  }

  onCancel() {
    this.authService.showLoginPopup.set(false);
  }
}
