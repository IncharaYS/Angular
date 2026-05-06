import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../core/services/booking.service';

@Component({
  selector: 'app-pickup-drop',
  imports: [FormsModule],
  template: `
    <section class="container py-4">
      <div class="page-title"><div><h1>Pickup/Drop Update</h1><p>Set pickup and dropoff schedule for a booking.</p></div></div>
      @if (message) {
        <div class="alert" [class.alert-success]="success" [class.alert-danger]="!success">{{ message }}</div>
      }
      <form class="card app-card" (ngSubmit)="submit()">
        <div class="card-body row g-3">
          <div class="col-md-4"><label class="form-label">Booking ID</label><input class="form-control" name="bookingId" [(ngModel)]="form.bookingId" required></div>
          <div class="col-md-4"><label class="form-label">Pickup Time</label><input class="form-control" type="datetime-local" name="pickupTime" [(ngModel)]="form.pickupTime" required></div>
          <div class="col-md-4"><label class="form-label">Dropoff Time</label><input class="form-control" type="datetime-local" name="dropoffTime" [(ngModel)]="form.dropoffTime" required></div>
          <div class="col-12"><button class="btn btn-primary" type="submit">Update Schedule</button></div>
        </div>
      </form>
    </section>
  `
})
export class PickupDropComponent {
  form = { bookingId: '', pickupTime: '', dropoffTime: '' };
  message = '';
  success = false;

  constructor(private readonly bookings: BookingService) {}

  submit(): void {
    this.bookings.updatePickupDrop(this.form).subscribe({
      next: () => {
        this.success = true;
        this.message = 'Pickup/drop updated successfully.';
      },
      error: () => {
        this.success = false;
        this.message = 'Pickup/drop update failed.';
      }
    });
  }
}
