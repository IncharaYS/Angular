export type UserRole = 'CUSTOMER' | 'ADMIN';

export interface AuthResponse {
  token: string;
  role: UserRole;
  username?: string;
  customerId?: number;
}

export interface Booking {
  bookingId?: number | string;
  customerId?: number | string;
  receiverName: string;
  receiverAddress: string;
  receiverPin: string;
  receiverMobile: string;
  parcelWeight?: number;
  parcelContents?: string;
  deliveryType?: string;
  packingPreference?: string;
  pickupTime?: string;
  dropoffTime?: string;
  status?: string;
  amount?: number;
  serviceCost?: number;
}

export interface Feedback {
  bookingId: number | string;
  rating: number;
  comments: string;
  customerName?: string;
  createdAt?: string;
}
