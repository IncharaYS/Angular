import { Injectable } from '@angular/core';
import { BookingService } from './booking.service';
import { FeedbackService } from './feedback.service';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(
    readonly bookings: BookingService,
    readonly feedback: FeedbackService
  ) {}
}
