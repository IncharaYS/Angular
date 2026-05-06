import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../core/services/feedback.service';
import { Feedback } from '../../shared/models/parcel.models';

@Component({
  selector: 'app-feedback-view',
  template: `
    <section class="container py-4">
      <div class="page-title"><div><h1>Customer Feedback</h1><p>Review all customer delivery feedback.</p></div></div>
      @if (message) {
        <div class="alert alert-warning">{{ message }}</div>
      }
      <div class="table-responsive card app-card">
        <table class="table table-hover align-middle mb-0">
          <thead><tr><th>Booking ID</th><th>Customer</th><th>Rating</th><th>Comments</th><th>Date</th></tr></thead>
          <tbody>
            @for (item of feedback; track item.bookingId) {
              <tr>
                <td>{{ item.bookingId }}</td>
                <td>{{ item.customerName || '-' }}</td>
                <td><span class="badge text-bg-success">{{ item.rating }}/5</span></td>
                <td>{{ item.comments }}</td>
                <td>{{ item.createdAt || '-' }}</td>
              </tr>
            } @empty {
              <tr><td colspan="5" class="text-center text-muted py-4">No feedback found.</td></tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `
})
export class FeedbackViewComponent implements OnInit {
  feedback: Feedback[] = [];
  message = '';

  constructor(private readonly feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.feedbackService.getAll().subscribe({
      next: (feedback) => (this.feedback = feedback),
      error: () => (this.message = 'Could not load feedback. Please try again shortly.')
    });
  }
}
