import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  imports: [RouterLink],
  template: `
    <section class="container py-4">
      <div class="page-title">
        <div>
          <h1>Customer Dashboard</h1>
          <p>Book, pay, track, and review your parcel deliveries.</p>
        </div>
        <a class="btn btn-primary" routerLink="/customer/booking">Book Parcel</a>
      </div>
      <div class="row g-3">
        @for (item of actions; track item.path) {
          <div class="col-md-6 col-xl-3">
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
export class CustomerDashboardComponent {
  actions = [
    { title: 'Create Booking', copy: 'Enter receiver and parcel details', path: '/customer/booking' },
    { title: 'Payment', copy: 'Pay for a confirmed booking', path: '/customer/payment' },
    { title: 'Track Parcel', copy: 'Lookup delivery status', path: '/customer/tracking' },
    { title: 'Invoice', copy: 'Generate and download invoice', path: '/customer/invoice' }
  ];
}
