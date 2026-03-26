import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AnalyticsC } from './analytics';
import { ApiService } from '../../services/api.service';
import { Analytics } from '../../models/models';

const mockAnalytics: Analytics = {
  totalTrips: 1000,
  averageFare: 15.5,
  averageDistance: 3.2,
  totalRevenue: 15500,
  mostPopularPickupZone: 'Midtown Center',
  mostUsedPaymentType: 'Credit Card'
};

describe('AnalyticsC', () => {
  let component: AnalyticsC;
  let fixture: ComponentFixture<AnalyticsC>;
  let apiService: { getAnalytics: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    apiService = { getAnalytics: vi.fn().mockReturnValue(of(mockAnalytics)) };

    await TestBed.configureTestingModule({
      imports: [AnalyticsC],
      providers: [
        { provide: ApiService, useValue: apiService },
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsC);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize filter form with empty date fields', () => {
    expect(component.filterForm.value).toEqual({ startDate: '', endDate: '' });
  });

  it('should call getAnalytics on init', () => {
    expect(apiService.getAnalytics).toHaveBeenCalled();
  });

  it('should call getAnalytics with date params when filters are applied', () => {
    component.filterForm.setValue({ startDate: '2025-01-01', endDate: '2025-01-31' });
    component.applyFilters();
    expect(apiService.getAnalytics).toHaveBeenCalledWith({ startDate: '2025-01-01', endDate: '2025-01-31' });
  });

  it('should call getAnalytics with empty params after reset', () => {
    component.filterForm.setValue({ startDate: '2025-01-01', endDate: '2025-01-31' });
    component.resetFilters();
    expect(apiService.getAnalytics).toHaveBeenCalledWith({});
  });

  it('should not apply filters when date range is invalid', () => {
    component.filterForm.setValue({ startDate: '2025-01-31', endDate: '2025-01-01' });
    expect(component.filterForm.hasError('invalidDateRange')).toBe(true);
  });
});
