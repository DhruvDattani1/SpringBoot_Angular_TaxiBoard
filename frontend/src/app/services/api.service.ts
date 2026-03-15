import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Trip, Zone, Vendor, PaymentType, Analytics, PagedResult } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTrips(params: any): Observable<PagedResult<Trip>> {
    return this.http.get<PagedResult<Trip>>(`${this.baseUrl}/trips`, { params });
  }

  getZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(`${this.baseUrl}/zones`);
  }

  getVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.baseUrl}/vendors`);
  }

  getPaymentTypes(): Observable<PaymentType[]> {
    return this.http.get<PaymentType[]>(`${this.baseUrl}/paymenttypes`);
  }

  getAnalytics(params: any): Observable<Analytics> {
    return this.http.get<Analytics>(`${this.baseUrl}/analytics`, { params });
  }
}

