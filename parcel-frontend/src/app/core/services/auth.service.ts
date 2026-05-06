import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, UserRole } from '../../shared/models/parcel.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'parcelx_token';
  private readonly roleKey = 'parcelx_role';
  readonly sessionChanged = signal(0);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  register(payload: Record<string, unknown>): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, payload);
  }

  login(payload: Record<string, unknown>): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, payload).pipe(
      tap((response) => this.storeSession(response.token, response.role))
    );
  }

  storeSession(token: string, role: UserRole): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.roleKey, role);
    this.sessionChanged.update((value) => value + 1);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    this.sessionChanged.update((value) => value + 1);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): UserRole | null {
    return localStorage.getItem(this.roleKey) as UserRole | null;
  }

  isLoggedIn(): boolean {
    return Boolean(this.getToken());
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }
}
