import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../core/services/booking.service';

@Component({
  selector: 'app-status-update',
  imports: [FormsModule],
  template: `
    <section class="container py-4">
      <div class="page-title"><div><h1>Update Status</h1><p>Change shipment status by booking ID.</p></div></div>
      @if (message) {
        <div class="alert" [class.alert-success]="success" [class.alert-danger]="!success">{{ message }}</div>
      }
      <form class="card app-card" (ngSubmit)="submit()">
        <div class="card-body row g-3">
          <div class="col-md-6"><label class="form-label">Booking ID</label><input class="form-control" name="bookingId" [(ngModel)]="form.bookingId" required></div>
          <div class="col-md-6"><label class="form-label">Status</label><select class="form-select" name="status" [(ngModel)]="form.status"><option>NEW</option><option>PICKED_UP</option><option>IN_TRANSIT</option><option>DELIVERED</option><option>CANCELLED</option></select></div>
          <div class="col-12"><button class="btn btn-primary" type="submit">Update Status</button></div>
        </div>
      </form>
    </section>
  `
})
export class StatusUpdateComponent {
  form = { bookingId: '', status: 'IN_TRANSIT' };
  message = '';
  success = false;

  constructor(private readonly bookings: BookingService) {}

  submit(): void {
    this.bookings.updateStatus(this.form).subscribe({
      next: () => {
        this.success = true;
        this.message = 'Status updated successfully.';
      },
      error: () => {
        this.success = false;
        this.message = 'Status update failed.';
      }
    });
  }
}
