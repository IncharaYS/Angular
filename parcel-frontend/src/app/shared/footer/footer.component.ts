import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="app-footer mt-auto">
      <div class="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        <div>
          <strong>ParcelX</strong>
          <span class="text-muted ms-2">Parcel Management System</span>
        </div>
        <nav class="footer-links" aria-label="Footer">
          <a href="mailto:support@parcelx.com">Support</a>
          <span>Secure Booking</span>
          <span>Fast Delivery</span>
        </nav>
        <span class="text-muted small">&copy; 2026 ParcelX. All rights reserved.</span>
      </div>
    </footer>
  `
})
export class FooterComponent {}
