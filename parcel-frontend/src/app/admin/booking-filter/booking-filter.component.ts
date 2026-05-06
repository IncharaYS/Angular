import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../core/services/booking.service';
import { Booking } from '../../shared/models/parcel.models';

@Component({
  selector: 'app-booking-filter',
  imports: [CurrencyPipe, FormsModule],
  template: `
    <section class="container py-4">
      <div class="page-title"><div><h1>Booking Filter</h1><p>Search bookings by customer, booking, status, or date range.</p></div></div>
      <form class="card app-card mb-3" (ngSubmit)="filter()">
        <div class="card-body row g-3">
          <div class="col-md-3"><label class="form-label">Booking ID</label><input class="form-control" name="bookingId" [(ngModel)]="form.bookingId"></div>
          <div class="col-md-3"><label class="form-label">Customer ID</label><input class="form-control" name="customerId" [(ngModel)]="form.customerId"></div>
          <div class="col-md-3"><label class="form-label">Status</label><input class="form-control" name="status" [(ngModel)]="form.status"></div>
          <div class="col-md-3"><label class="form-label">Date</label><input class="form-control" type="date" name="date" [(ngModel)]="form.date"></div>
          <div class="col-12"><button class="btn btn-primary" type="submit">Apply Filter</button></div>
        </div>
      </form>
      @if (message) {
        <div class="alert alert-warning">{{ message }}</div>
      }
      <div class="table-responsive card app-card">
        <table class="table table-hover mb-0">
          <thead><tr><th>Booking ID</th><th>Customer</th><th>Receiver</th><th>Status</th><th>Amount</th></tr></thead>
          <tbody>
            @for (booking of bookings; track booking.bookingId) {
              <tr><td>{{ booking.bookingId }}</td><td>{{ booking.customerId }}</td><td>{{ booking.receiverName }}</td><td>{{ booking.status }}</td><td>{{ booking.amount || booking.serviceCost | currency:'INR' }}</td></tr>
            } @empty {
              <tr><td colspan="5" class="text-center text-muted py-4">No filtered results yet.</td></tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `
})
export class BookingFilterComponent {
  form = { bookingId: '', customerId: '', status: '', date: '' };
  bookings: Booking[] = [];
  message = '';

  constructor(private readonly bookingService: BookingService) {}

  filter(): void {
    this.message = '';
    this.bookingService.filterBookings(this.form).subscribe({
      next: (bookings) => (this.bookings = bookings),
      error: () => (this.message = 'Filter failed. Please adjust the criteria and try again.')
    });
  }
}
