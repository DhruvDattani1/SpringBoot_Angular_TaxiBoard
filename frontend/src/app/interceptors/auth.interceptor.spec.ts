import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('authInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    authService = TestBed.inject(AuthService);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should attach Authorization header when token is present', () => {
    const payload = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 }));
    localStorage.setItem('jwt_token', `header.${payload}.signature`);

    httpClient.get('/api/trips').subscribe();

    const req = httpMock.expectOne('/api/trips');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer header.${payload}.signature`);
    req.flush({});
  });

  it('should not attach Authorization header when no token is present', () => {
    httpClient.get('/api/trips').subscribe();

    const req = httpMock.expectOne('/api/trips');
    expect(req.request.headers.get('Authorization')).toBeNull();
    req.flush({});
  });
});
