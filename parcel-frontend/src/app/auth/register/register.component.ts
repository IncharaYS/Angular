import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  template: `
    <section class="container auth-page">
      <div class="auth-card wide">
        <h1 class="h3 mb-1">Customer Registration</h1>
        <p class="text-muted mb-4">Create an account for parcel booking and tracking.</p>
        @if (message) {
          <div class="alert" [class.alert-success]="success" [class.alert-danger]="!success">{{ message }}</div>
        }
        <form class="row g-3" (ngSubmit)="submit()">
          <div class="col-md-6">
            <label class="form-label">Full Name</label>
            <input class="form-control" name="name" [(ngModel)]="form.name" required>
          </div>
          <div class="col-md-6">
            <label class="form-label">Email</label>
            <input class="form-control" type="email" name="email" [(ngModel)]="form.email" required>
          </div>
          <div class="col-md-6">
            <label class="form-label">Mobile</label>
            <input class="form-control" name="mobile" [(ngModel)]="form.mobile" required>
          </div>
          <div class="col-md-6">
            <label class="form-label">Password</label>
            <input class="form-control" type="password" name="password" [(ngModel)]="form.password" required>
          </div>
          <div class="col-12">
            <label class="form-label">Address</label>
            <textarea class="form-control" name="address" rows="3" [(ngModel)]="form.address" required></textarea>
          </div>
          <div class="col-12">
            <button class="btn btn-primary" type="submit" [disabled]="loading">{{ loading ? 'Creating...' : 'Register' }}</button>
            <a class="btn btn-link" routerLink="/login">Already have an account?</a>
          </div>
        </form>
      </div>
    </section>
  `
})
export class RegisterComponent {
  form = { name: '', email: '', mobile: '', password: '', address: '', role: 'CUSTOMER' };
  loading = false;
  message = '';
  success = false;

  constructor(private readonly auth: AuthService) {}

  submit(): void {
    this.loading = true;
    this.message = '';
    this.auth.register(this.form).subscribe({
      next: () => {
        this.success = true;
        this.message = 'Registration successful. You can login now.';
        this.loading = false;
      },
      error: () => {
        this.success = false;
        this.message = 'Registration failed. Please review the details and try again.';
        this.loading = false;
      }
    });
  }
}
