import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../../core/services/feedback.service';
import { Feedback } from '../../shared/models/parcel.models';

@Component({
  selector: 'app-feedback',
  imports: [FormsModule],
  template: `
    <section class="container py-4">
      <div class="page-title"><div><h1>Feedback</h1><p>Rate your parcel delivery experience.</p></div></div>
      @if (message) {
        <div class="alert" [class.alert-success]="success" [class.alert-danger]="!success">{{ message }}</div>
      }
      <form class="card app-card" (ngSubmit)="submit()">
        <div class="card-body row g-3">
          <div class="col-md-6"><label class="form-label">Booking ID</label><input class="form-control" name="bookingId" [(ngModel)]="form.bookingId" required></div>
          <div class="col-md-6"><label class="form-label">Rating</label><select class="form-select" name="rating" [(ngModel)]="form.rating"><option [ngValue]="5">5</option><option [ngValue]="4">4</option><option [ngValue]="3">3</option><option [ngValue]="2">2</option><option [ngValue]="1">1</option></select></div>
          <div class="col-12"><label class="form-label">Comments</label><textarea class="form-control" rows="4" name="comments" [(ngModel)]="form.comments" required></textarea></div>
          <div class="col-12"><button class="btn btn-primary" type="submit">Submit Feedback</button></div>
        </div>
      </form>
    </section>
  `
})
export class FeedbackComponent {
  form: Feedback = { bookingId: '', rating: 5, comments: '' };
  message = '';
  success = false;

  constructor(private readonly feedback: FeedbackService) {}

  submit(): void {
    this.feedback.submit(this.form).subscribe({
      next: () => {
        this.success = true;
        this.message = 'Feedback submitted. Thank you.';
      },
      error: () => {
        this.success = false;
        this.message = 'Feedback submission failed.';
      }
    });
  }
}
