import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Feedback } from '../../shared/models/parcel.models';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  constructor(private readonly http: HttpClient) {}

  submit(payload: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${environment.apiUrl}/feedback`, payload);
  }

  getAll(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${environment.apiUrl}/feedback`);
  }
}
