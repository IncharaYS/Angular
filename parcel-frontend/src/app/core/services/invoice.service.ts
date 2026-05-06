import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  constructor(private readonly http: HttpClient) {}

  generate(bookingId: string): Observable<Record<string, unknown>> {
    return this.http.post<Record<string, unknown>>(`${environment.apiUrl}/invoices/${bookingId}`, {});
  }

  download(bookingId: string): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/invoices/download/${bookingId}`, { responseType: 'blob' });
  }
}
