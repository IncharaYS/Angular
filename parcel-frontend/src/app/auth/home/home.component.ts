import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="hero-band">
      <div class="container py-5">
        <div class="row align-items-center g-4">
          <div class="col-lg-7">
            <span class="badge text-bg-light text-primary mb-3">Parcel Management System</span>
            <h1 class="display-5 fw-bold mb-3">ParcelX</h1>
            <p class="lead text-secondary mb-4">
              Book parcels, track shipments, manage payments, generate invoices, and run admin operations from one focused dashboard.
            </p>
            <div class="d-flex flex-wrap gap-2">
              <a class="btn btn-light btn-lg" routerLink="/register">Create Customer Account</a>
              <a class="btn btn-outline-light btn-lg" routerLink="/login">Login</a>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="hero-panel">
              <div class="metric"><strong>Fast booking</strong><span>Receiver, parcel, pickup and drop details</span></div>
              <div class="metric"><strong>Live tracking</strong><span>Status and cost lookup by booking ID</span></div>
              <div class="metric"><strong>Admin control</strong><span>Filters, status updates, pickup/drop updates</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent {}
