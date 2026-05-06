import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { BookingFilterComponent } from './admin/booking-filter/booking-filter.component';
import { BookingsComponent } from './admin/bookings/bookings.component';
import { FeedbackViewComponent } from './admin/feedback-view/feedback-view.component';
import { PickupDropComponent } from './admin/pickup-drop/pickup-drop.component';
import { StatusUpdateComponent } from './admin/status-update/status-update.component';
import { HomeComponent } from './auth/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';
import { BookingComponent } from './customer/booking/booking.component';
import { CustomerDashboardComponent } from './customer/dashboard/dashboard.component';
import { FeedbackComponent } from './customer/feedback/feedback.component';
import { InvoiceComponent } from './customer/invoice/invoice.component';
import { PaymentComponent } from './customer/payment/payment.component';
import { PreviousBookingsComponent } from './customer/previous-bookings/previous-bookings.component';
import { TrackingComponent } from './customer/tracking/tracking.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'customer/dashboard', component: CustomerDashboardComponent, canActivate: [authGuard] },
  { path: 'customer/booking', component: BookingComponent, canActivate: [authGuard] },
  { path: 'customer/tracking', component: TrackingComponent, canActivate: [authGuard] },
  { path: 'customer/previous-bookings', component: PreviousBookingsComponent, canActivate: [authGuard] },
  { path: 'customer/payment', component: PaymentComponent, canActivate: [authGuard] },
  { path: 'customer/feedback', component: FeedbackComponent, canActivate: [authGuard] },
  { path: 'customer/invoice', component: InvoiceComponent, canActivate: [authGuard] },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [adminGuard] },
  { path: 'admin/bookings', component: BookingsComponent, canActivate: [adminGuard] },
  { path: 'admin/status-update', component: StatusUpdateComponent, canActivate: [adminGuard] },
  { path: 'admin/pickup-drop', component: PickupDropComponent, canActivate: [adminGuard] },
  { path: 'admin/filter', component: BookingFilterComponent, canActivate: [adminGuard] },
  { path: 'admin/feedback', component: FeedbackViewComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' }
];
