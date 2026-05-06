import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../core/services/booking.service';
import { Booking } from '../../shared/models/parcel.models';

@Component({
  selector: 'app-tracking',
  imports: [CurrencyPipe, FormsModule],
  template: `
    <section class="container py-4">
      <div class="page-title">
        <div>
          <h1>Track Booking</h1>
          <p>Search by booking ID to view status and delivery details.</p>
        </div>
      </div>
      <form class="search-row" (ngSubmit)="track()">
        <input class="form-control" name="bookingId" placeholder="Booking ID" [(ngModel)]="bookingId" required>
        <button class="btn btn-primary" type="submit">Track</button>
      </form>
      @if (message) {
        <div class="alert alert-danger mt-3">{{ message }}</div>
      }
      @if (booking) {
        <div class="card app-card mt-3">
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-4"><span class="label">Booking ID</span><strong>{{ booking.bookingId }}</strong></div>
              <div class="col-md-4"><span class="label">Status</span><strong>{{ booking.status }}</strong></div>
              <div class="col-md-4"><span class="label">Service Cost</span><strong>{{ booking.serviceCost || booking.amount | currency:'INR' }}</strong></div>
              <div class="col-md-6"><span class="label">Receiver Name</span><strong>{{ booking.receiverName }}</strong></div>
              <div class="col-md-6"><span class="label">Receiver Address</span><strong>{{ booking.receiverAddress }}</strong></div>
              <div class="col-md-6"><span class="label">Pickup Time</span><strong>{{ booking.pickupTime }}</strong></div>
              <div class="col-md-6"><span class="label">Dropoff Time</span><strong>{{ booking.dropoffTime }}</strong></div>
            </div>
          </div>
        </div>
      }
    </section>
  `
})
export class TrackingComponent {
  bookingId = '';
  booking?: Booking;
  message = '';

  constructor(private readonly bookings: BookingService) {}

  track(): void {
    this.message = '';
    this.booking = undefined;
    this.bookings.getBooking(this.bookingId).subscribe({
      next: (booking) => (this.booking = booking),
      error: () => (this.message = 'No booking found for the entered ID.')
    });
  }
}
