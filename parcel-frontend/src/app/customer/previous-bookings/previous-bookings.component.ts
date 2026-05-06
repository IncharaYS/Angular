import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../core/services/booking.service';
import { Booking } from '../../shared/models/parcel.models';

@Component({
  selector: 'app-previous-bookings',
  imports: [CurrencyPipe, RouterLink],
  template: `
    <section class="container py-4">
      <div class="page-title">
        <div>
          <h1>Previous Bookings</h1>
          <p>Your parcel booking history.</p>
        </div>
        <a class="btn btn-primary" routerLink="/customer/booking">New Booking</a>
      </div>
      @if (message) {
        <div class="alert alert-warning">{{ message }}</div>
      }
      <div class="table-responsive card app-card">
        <table class="table table-hover align-middle mb-0">
          <thead><tr><th>Booking ID</th><th>Receiver Name</th><th>Status</th><th>Amount</th><th></th></tr></thead>
          <tbody>
            @for (booking of bookings; track booking.bookingId) {
              <tr>
                <td>{{ booking.bookingId }}</td>
                <td>{{ booking.receiverName }}</td>
                <td><span class="badge text-bg-info">{{ booking.status || 'NEW' }}</span></td>
                <td>{{ booking.amount || booking.serviceCost | currency:'INR' }}</td>
                <td class="text-end"><button class="btn btn-sm btn-outline-danger" (click)="cancel(booking)">Cancel</button></td>
              </tr>
            } @empty {
              <tr><td colspan="5" class="text-center text-muted py-4">No bookings found.</td></tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `
})
export class PreviousBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  message = '';

  constructor(private readonly bookingService: BookingService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.bookingService.getMyBookings().subscribe({
      next: (bookings) => (this.bookings = bookings),
      error: () => (this.message = 'Could not load your bookings. Please try again shortly.')
    });
  }

  cancel(booking: Booking): void {
    if (!booking.bookingId) return;
    this.bookingService.cancelBooking(booking.bookingId).subscribe({ next: () => this.load() });
  }
}
