import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Booking } from '../../shared/models/parcel.models';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private readonly http: HttpClient) {}

  createBooking(payload: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${environment.apiUrl}/bookings`, payload);
  }

  getBooking(bookingId: string): Observable<Booking> {
    return this.http.get<Booking>(`${environment.apiUrl}/bookings/${bookingId}`);
  }

  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${environment.apiUrl}/bookings/my`);
  }

  cancelBooking(bookingId: string | number): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/bookings/cancel/${bookingId}`, {});
  }

  getPagedBookings(page = 0, size = 10, status = ''): Observable<{ content: Booking[]; totalPages: number; totalElements: number }> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (status) params = params.set('status', status);
    return this.http.get<{ content: Booking[]; totalPages: number; totalElements: number }>(`${environment.apiUrl}/bookings/paged`, { params });
  }

  filterBookings(payload: Record<string, unknown>): Observable<Booking[]> {
    return this.http.post<Booking[]>(`${environment.apiUrl}/bookings/filter`, payload);
  }

  updateStatus(payload: { bookingId: string | number; status: string }): Observable<Booking> {
    return this.http.put<Booking>(`${environment.apiUrl}/bookings/status`, payload);
  }

  updatePickupDrop(payload: { bookingId: string | number; pickupTime: string; dropoffTime: string }): Observable<Booking> {
    return this.http.put<Booking>(`${environment.apiUrl}/bookings/pickup-drop`, payload);
  }
}
