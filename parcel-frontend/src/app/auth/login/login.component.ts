import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  template: `
    <section class="container auth-page">
      <div class="auth-card">
        <h1 class="h3 mb-1">Login</h1>
        <p class="text-muted mb-4">Access your customer or admin workspace.</p>
        @if (message) {
          <div class="alert" [class.alert-success]="success" [class.alert-danger]="!success">{{ message }}</div>
        }
        <form (ngSubmit)="submit()">
          <div class="mb-3">
            <label class="form-label">Username or Email</label>
            <input class="form-control" name="username" [(ngModel)]="form.username" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input class="form-control" type="password" name="password" [(ngModel)]="form.password" required>
          </div>
          <button class="btn btn-primary w-100" type="submit" [disabled]="loading">{{ loading ? 'Signing in...' : 'Login' }}</button>
        </form>
        <p class="mt-3 mb-0 text-center text-muted">New customer? <a routerLink="/register">Register</a></p>
      </div>
    </section>
  `
})
export class LoginComponent {
  form = { username: '', password: '' };
  loading = false;
  message = '';
  success = false;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  submit(): void {
    this.loading = true;
    this.message = '';
    this.auth.login(this.form).subscribe({
      next: () => {
        this.success = true;
        this.router.navigate([this.auth.isAdmin() ? '/admin/dashboard' : '/customer/dashboard']);
      },
      error: () => {
        this.success = false;
        this.message = 'Login failed. Please check your credentials and try again.';
        this.loading = false;
      }
    });
  }
}
