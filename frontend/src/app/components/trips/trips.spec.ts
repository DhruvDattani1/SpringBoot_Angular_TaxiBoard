import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Trips } from './trips';
import { ApiService } from '../../services/api.service';
import { PagedResult, Trip } from '../../models/models';

const mockPagedResult: PagedResult<Trip> = {
  content: [
    {
      tripId: 1,
      pickupDatetime: '2025-01-01T10:00:00',
      dropoffDatetime: '2025-01-01T10:30:00',
      passengerCount: 2,
      pickupZone: 'Midtown Center',
      dropoffZone: 'JFK Airport',
      vendor: 'Creative Mobile Technologies',
      paymentType: 'Credit Card',
      tripDistance: 5.2,
      fareAmount: 22.5
    }
  ],
  page: {
    size: 10,
    number: 0,
    totalElements: 1,
    totalPages: 1
  }
};

describe('Trips', () => {
  let component: Trips;
  let fixture: ComponentFixture<Trips>;
  let apiService: {
    getTrips: ReturnType<typeof vi.fn>,
    getZones: ReturnType<typeof vi.fn>,
    getVendors: ReturnType<typeof vi.fn>,
    getPaymentTypes: ReturnType<typeof vi.fn>
  };

  beforeEach(async () => {
    apiService = {
      getTrips: vi.fn().mockReturnValue(of(mockPagedResult)),
      getZones: vi.fn().mockReturnValue(of([])),
      getVendors: vi.fn().mockReturnValue(of([])),
      getPaymentTypes: vi.fn().mockReturnValue(of([]))
    };

    await TestBed.configureTestingModule({
      imports: [Trips],
      providers: [
        { provide: ApiService, useValue: apiService },
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Trips);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize filter form with correct default values', () => {
    expect(component.filterForm.value).toEqual({
      startDate: '',
      endDate: '',
      passengers: '',
      paymentType: '',
      pickupZone: '',
      vendor: '',
      pageSize: 10
    });
  });

  it('should call getTrips on init', () => {
    expect(apiService.getTrips).toHaveBeenCalled();
  });

  it('should call lookup endpoints on init', () => {
    expect(apiService.getZones).toHaveBeenCalled();
    expect(apiService.getVendors).toHaveBeenCalled();
    expect(apiService.getPaymentTypes).toHaveBeenCalled();
  });

  it('should set totalPages and currentPage from response', () => {
    expect(component.totalPages).toBe(1);
    expect(component.currentPage).toBe(0);
  });

  it('should not go to previous page when on first page', () => {
    component.currentPage = 0;
    component.prevPage();
    expect(apiService.getTrips).toHaveBeenCalledTimes(1);
  });

  it('should not go to next page when on last page', () => {
    component.currentPage = 0;
    component.totalPages = 1;
    component.nextPage();
    expect(apiService.getTrips).toHaveBeenCalledTimes(1);
  });

  it('should reset form and page on resetFilters', () => {
    component.filterForm.patchValue({ passengers: '3' });
    component.resetFilters();
    expect(component.currentPage).toBe(0);
    expect(component.filterForm.value.passengers).toBe('');
  });

  it('should not apply filters when date range is invalid', () => {
    component.filterForm.patchValue({ startDate: '2025-01-31', endDate: '2025-01-01' });
    component.applyFilters();
    expect(component.filterForm.hasError('invalidDateRange')).toBe(true);
  });
});
