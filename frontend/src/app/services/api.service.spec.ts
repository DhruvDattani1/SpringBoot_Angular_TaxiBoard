import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call correct URL for getTrips', () => {
    service.getTrips({}).subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/trips`);
    expect(req.request.method).toBe('GET');
    req.flush({ content: [], page: { size: 10, number: 0, totalElements: 0, totalPages: 0 } });
  });

  it('should call correct URL for getZones', () => {
    service.getZones().subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/zones`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should call correct URL for getVendors', () => {
    service.getVendors().subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/vendors`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should call correct URL for getPaymentTypes', () => {
    service.getPaymentTypes().subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/paymenttypes`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should call correct URL for getAnalytics', () => {
    service.getAnalytics({}).subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/analytics`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
