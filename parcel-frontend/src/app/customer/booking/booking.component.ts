import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { BookingService } from '../../core/services/booking.service';
import { Booking } from '../../shared/models/parcel.models';

@Component({
  selector: 'app-booking',
  imports: [FormsModule, RouterLink],
  template: `
    <section class="container py-4">
      <div class="page-title">
        <div>
          <h1>{{ auth.isAdmin() ? 'Book For Customer' : 'Book Parcel' }}</h1>
          <p>Capture receiver, parcel, pickup, and dropoff details.</p>
        </div>
        <a class="btn btn-outline-secondary" routerLink="/customer/previous-bookings">Previous Bookings</a>
      </div>
      @if (message) {
        <div class="alert" [class.alert-success]="success" [class.alert-danger]="!success">{{ message }}</div>
      }
      <form class="card app-card" (ngSubmit)="submit()">
        <div class="card-body row g-3">
          @if (auth.isAdmin()) {
            <div class="col-md-4">
              <label class="form-label">Customer ID</label>
              <input class="form-control" name="customerId" [(ngModel)]="form.customerId" required>
            </div>
          }
          <div class="col-md-4">
            <label class="form-label">Receiver Name</label>
            <input class="form-control" name="receiverName" [(ngModel)]="form.receiverName" required>
          </div>
          <div class="col-md-4">
            <label class="form-label">Receiver Mobile</label>
            <input class="form-control" name="receiverMobile" [(ngModel)]="form.receiverMobile" required>
          </div>
          <div class="col-md-4">
            <label class="form-label">Receiver PIN</label>
            <input class="form-control" name="receiverPin" [(ngModel)]="form.receiverPin" required>
          </div>
          <div class="col-md-8">
            <label class="form-label">Receiver Address</label>
            <input class="form-control" name="receiverAddress" [(ngModel)]="form.receiverAddress" required>
          </div>
          <div class="col-md-4">
            <label class="form-label">Parcel Weight</label>
            <input class="form-control" type="number" name="parcelWeight" [(ngModel)]="form.parcelWeight" required>
          </div>
          <div class="col-md-4">
            <label class="form-label">Delivery Type</label>
            <select class="form-select" name="deliveryType" [(ngModel)]="form.deliveryType">
              <option>STANDARD</option>
              <option>EXPRESS</option>
              <option>SAME_DAY</option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label">Packing Preference</label>
            <select class="form-select" name="packingPreference" [(ngModel)]="form.packingPreference">
              <option>BASIC</option>
              <option>PREMIUM</option>
              <option>FRAGILE</option>
            </select>
          </div>
          <div class="col-12">
            <label class="form-label">Parcel Contents</label>
            <textarea class="form-control" rows="3" name="parcelContents" [(ngModel)]="form.parcelContents"></textarea>
          </div>
          <div class="col-md-6">
            <label class="form-label">Pickup Time</label>
            <input class="form-control" type="datetime-local" name="pickupTime" [(ngModel)]="form.pickupTime">
          </div>
          <div class="col-md-6">
            <label class="form-label">Dropoff Time</label>
            <input class="form-control" type="datetime-local" name="dropoffTime" [(ngModel)]="form.dropoffTime">
          </div>
          <div class="col-12">
            <button class="btn btn-primary" type="submit" [disabled]="loading">{{ loading ? 'Saving...' : 'Create Booking' }}</button>
          </div>
        </div>
      </form>
    </section>
  `
})
export class BookingComponent {
  form: Booking = {
    receiverName: '',
    receiverAddress: '',
    receiverPin: '',
    receiverMobile: '',
    parcelWeight: 1,
    parcelContents: '',
    deliveryType: 'STANDARD',
    packingPreference: 'BASIC',
    pickupTime: '',
    dropoffTime: ''
  };
  loading = false;
  message = '';
  success = false;

  constructor(
    readonly auth: AuthService,
    private readonly bookings: BookingService
  ) {}

  submit(): void {
    this.loading = true;
    this.bookings.createBooking(this.form).subscribe({
      next: (booking) => {
        this.success = true;
        this.message = `Booking created successfully${booking.bookingId ? `: ${booking.bookingId}` : ''}.`;
        this.loading = false;
      },
      error: () => {
        this.success = false;
        this.message = 'Booking failed. Please review the parcel details and try again.';
        this.loading = false;
      }
    });
  }
}
