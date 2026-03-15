export interface Trip {
  tripId: number;
  pickupDatetime: string;
  dropoffDatetime: string;
  passengerCount: number;
  pickupZone: string;
  dropoffZone: string;
  vendor: string;
  paymentType: string;
  tripDistance: number;
  fareAmount: number;
}

export interface Zone {
  locationId: number;
  borough: string;
  zone: string;
  serviceZone: string;
}

export interface Vendor {
  vendorId: number;
  vendorName: string;
}

export interface PaymentType {
  paymentTypeId: number;
  paymentDescription: string;
}

export interface Analytics {
  totalTrips: number;
  averageFare: number;
  averageDistance: number;
  totalRevenue: number;
  mostPopularPickupZone: string;
  mostUsedPaymentType: string;
}

export interface PagedResult<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
