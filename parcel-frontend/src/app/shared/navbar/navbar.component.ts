import { Component, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light app-navbar">
      <div class="container">
        <a class="navbar-brand fw-bold" routerLink="/">ParcelX</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav ms-auto gap-lg-2">
            @for (item of links(); track item.path) {
              <li class="nav-item">
                <a class="nav-link" [routerLink]="item.path" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: item.path === '/' }">
                  {{ item.label }}
                </a>
              </li>
            }
            @if (auth.isLoggedIn()) {
              <li class="nav-item">
                <button class="btn btn-outline-light btn-sm ms-lg-2" type="button" (click)="auth.logout()">Logout</button>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  readonly links = computed(() => {
    this.auth.sessionChanged();
    if (!this.auth.isLoggedIn()) {
      return [
        { label: 'Home', path: '/' },
        { label: 'Login', path: '/login' },
        { label: 'Register', path: '/register' }
      ];
    }
    if (this.auth.isAdmin()) {
      return [
        { label: 'Dashboard', path: '/admin/dashboard' },
        { label: 'Book For Customer', path: '/customer/booking' },
        { label: 'View Bookings', path: '/admin/bookings' },
        { label: 'Update Status', path: '/admin/status-update' },
        { label: 'Pickup/Drop', path: '/admin/pickup-drop' },
        { label: 'Feedback', path: '/admin/feedback' }
      ];
    }
    return [
      { label: 'Dashboard', path: '/customer/dashboard' },
      { label: 'Book Parcel', path: '/customer/booking' },
      { label: 'Track', path: '/customer/tracking' },
      { label: 'Previous Bookings', path: '/customer/previous-bookings' },
      { label: 'Feedback', path: '/customer/feedback' }
    ];
  });

  constructor(readonly auth: AuthService) {}
}
