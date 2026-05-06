import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../core/services/booking.service';
import { Booking } from '../../shared/models/parcel.models';

@Component({
  selector: 'app-bookings',
  imports: [CurrencyPipe, FormsModule],
  template: `
    <section class="container py-4">
      <div class="page-title"><div><h1>All Bookings</h1><p>Review paged bookings and filter by status.</p></div></div>
      <div class="toolbar">
        <select class="form-select" [(ngModel)]="status" name="status" (change)="page = 0; load()">
          <option value="">All Statuses</option>
          @for (option of statuses; track option) {
            <option [value]="option">{{ option }}</option>
          }
        </select>
        <button class="btn btn-outline-primary" (click)="load()">Refresh</button>
      </div>
      @if (message) {
        <div class="alert alert-warning">{{ message }}</div>
      }
      <div class="table-responsive card app-card">
        <table class="table table-hover align-middle mb-0">
          <thead><tr><th>Booking ID</th><th>Customer</th><th>Receiver</th><th>Status</th><th>Amount</th><th>Pickup</th><th>Dropoff</th></tr></thead>
          <tbody>
            @for (booking of bookings; track booking.bookingId) {
              <tr>
                <td>{{ booking.bookingId }}</td>
                <td>{{ booking.customerId || '-' }}</td>
                <td>{{ booking.receiverName }}</td>
                <td><span class="badge text-bg-primary">{{ booking.status || 'NEW' }}</span></td>
                <td>{{ booking.amount || booking.serviceCost | currency:'INR' }}</td>
                <td>{{ booking.pickupTime || '-' }}</td>
                <td>{{ booking.dropoffTime || '-' }}</td>
              </tr>
            } @empty {
              <tr><td colspan="7" class="text-center text-muted py-4">No bookings found.</td></tr>
            }
          </tbody>
        </table>
      </div>
      <div class="pager">
        <button class="btn btn-outline-secondary" [disabled]="page === 0" (click)="page = page - 1; load()">Previous</button>
        <span>Page {{ page + 1 }} of {{ totalPages || 1 }}</span>
        <button class="btn btn-outline-secondary" [disabled]="page + 1 >= totalPages" (click)="page = page + 1; load()">Next</button>
      </div>
    </section>
  `
})
export class BookingsComponent implements OnInit {
  bookings: Booking[] = [];
  statuses = ['NEW', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'];
  status = '';
  page = 0;
  totalPages = 0;
  message = '';

  constructor(private readonly bookingService: BookingService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.message = '';
    this.bookingService.getPagedBookings(this.page, 10, this.status).subscribe({
      next: (result) => {
        this.bookings = result.content || [];
        this.totalPages = result.totalPages || 0;
      },
      error: () => (this.message = 'Could not load bookings. Please try again shortly.')
    });
  }
}
