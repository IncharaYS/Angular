import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvoiceService } from '../../core/services/invoice.service';

@Component({
  selector: 'app-invoice',
  imports: [FormsModule],
  template: `
    <section class="container py-4">
      <div class="page-title"><div><h1>Invoice</h1><p>Generate and download booking invoices as PDF.</p></div></div>
      @if (message) {
        <div class="alert" [class.alert-success]="success" [class.alert-danger]="!success">{{ message }}</div>
      }
      <div class="card app-card">
        <div class="card-body">
          <form class="search-row" (ngSubmit)="generate()">
            <input class="form-control" name="bookingId" placeholder="Booking ID" [(ngModel)]="bookingId" required>
            <button class="btn btn-primary" type="submit">Generate</button>
            <button class="btn btn-outline-primary" type="button" (click)="download()">Download PDF</button>
          </form>
        </div>
      </div>
    </section>
  `
})
export class InvoiceComponent {
  bookingId = '';
  message = '';
  success = false;

  constructor(private readonly invoices: InvoiceService) {}

  generate(): void {
    this.invoices.generate(this.bookingId).subscribe({
      next: () => {
        this.success = true;
        this.message = 'Invoice generated.';
      },
      error: () => {
        this.success = false;
        this.message = 'Invoice generation failed.';
      }
    });
  }

  download(): void {
    if (!this.bookingId) return;
    this.invoices.download(this.bookingId).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `invoice-${this.bookingId}.pdf`;
        anchor.click();
        URL.revokeObjectURL(url);
      },
      error: () => {
        this.success = false;
        this.message = 'Invoice download failed.';
      }
    });
  }
}
