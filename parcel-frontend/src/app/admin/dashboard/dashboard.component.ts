import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink],
  template: `
    <section class="container py-4">
      <div class="page-title">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage bookings, shipment status, pickup/drop timing, and feedback.</p>
        </div>
      </div>
      <div class="row g-3">
        @for (item of actions; track item.path) {
          <div class="col-md-6 col-xl-4">
            <a class="dashboard-tile" [routerLink]="item.path">
              <strong>{{ item.title }}</strong>
              <span>{{ item.copy }}</span>
            </a>
          </div>
        }
      </div>
    </section>
  `
})
export class AdminDashboardComponent {
  actions = [
    { title: 'Book For Customer', copy: 'Create a booking with a customer ID', path: '/customer/booking' },
    { title: 'View Bookings', copy: 'Paged list with status filter', path: '/admin/bookings' },
    { title: 'Filter Bookings', copy: 'Search by customer, status, date', path: '/admin/filter' },
    { title: 'Update Status', copy: 'Change delivery lifecycle state', path: '/admin/status-update' },
    { title: 'Pickup/Drop', copy: 'Adjust pickup and dropoff times', path: '/admin/pickup-drop' },
    { title: 'Feedback', copy: 'Review customer feedback', path: '/admin/feedback' }
  ];
}
