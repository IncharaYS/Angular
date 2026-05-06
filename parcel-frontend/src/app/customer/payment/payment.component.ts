import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-payment',
  imports: [FormsModule],
  template: `
    <section class="container py-4">
      <div class="page-title"><div><h1>Payment</h1><p>Submit card details for a parcel booking.</p></div></div>
      @if (message) {
        <div class="alert" [class.alert-success]="success" [class.alert-danger]="!success">{{ message }}</div>
      }
      <form class="card app-card" (ngSubmit)="submit()">
        <div class="card-body row g-3">
          <div class="col-md-4"><label class="form-label">Booking ID</label><input class="form-control" name="bookingId" [(ngModel)]="form.bookingId" required></div>
          <div class="col-md-4"><label class="form-label">Card Type</label><select class="form-select" name="cardType" [(ngModel)]="form.cardType"><option>VISA</option><option>MASTERCARD</option><option>RUPAY</option></select></div>
          <div class="col-md-4"><label class="form-label">Card Number</label><input class="form-control" name="cardNumber" maxlength="19" [(ngModel)]="form.cardNumber" required></div>
          <div class="col-md-6"><label class="form-label">Card Holder Name</label><input class="form-control" name="cardHolderName" [(ngModel)]="form.cardHolderName" required></div>
          <div class="col-md-2"><label class="form-label">Expiry Month</label><input class="form-control" name="expiryMonth" maxlength="2" [(ngModel)]="form.expiryMonth" required></div>
          <div class="col-md-2"><label class="form-label">Expiry Year</label><input class="form-control" name="expiryYear" maxlength="4" [(ngModel)]="form.expiryYear" required></div>
          <div class="col-md-2"><label class="form-label">CVV</label><input class="form-control" type="password" name="cvv" maxlength="4" [(ngModel)]="form.cvv" required></div>
          <div class="col-12"><button class="btn btn-primary" type="submit" [disabled]="loading">{{ loading ? 'Processing...' : 'Pay Now' }}</button></div>
        </div>
      </form>
    </section>
  `
})
export class PaymentComponent {
  form = { bookingId: '', cardType: 'VISA', cardNumber: '', cardHolderName: '', expiryMonth: '', expiryYear: '', cvv: '' };
  loading = false;
  message = '';
  success = false;

  constructor(private readonly payments: PaymentService) {}

  submit(): void {
    this.loading = true;
    this.payments.pay(this.form).subscribe({
      next: () => {
        this.success = true;
        this.message = 'Payment submitted successfully.';
        this.loading = false;
      },
      error: () => {
        this.success = false;
        this.message = 'Payment failed. Please check the booking and card details.';
        this.loading = false;
      }
    });
  }
}
